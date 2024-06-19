import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
const { Header, Content, Footer, Sider } = Layout;
import { Route, Routes } from "react-router-dom";
import { RouterModel } from "../models/RouterModel";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import SidebarComponent from "../components/SidebarComponent/SidebarComponent";
import "../assets/scss/style.scss";
import LoginPage from "../pages/LoginPage";
import { useLocation } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";

function RouterIndex() {
  const [name, setName] = useState("");
  const location = useLocation();
  if (location.pathname === "/register") {
    return <RegisterPage />;
  }
  const token = localStorage.getItem("token");
  if (!token) {
    return <LoginPage />;
  }

  // console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.authen, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status === true) {
        setName(`${res.data.data.name} ${res.data.data.surname}`);
        localStorage.setItem("member_id", res.data.data.id);

        const getCompany = await API.get(
          ApiRouter.CompanyByMemberId + res.data.data.id
        );
        // console.log(getCompany.data.data);
        if (getCompany.data.data.length > 0) {
          localStorage.setItem("company_id", getCompany.data.data[0].company_id);
        }else{
          localStorage.setItem("company_id", "no data");
        }
      } else {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <SidebarComponent />
      <Layout>
        <NavbarComponent name={name} />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: "#fff",
            }}
          >
            <Routes>
              {RouterModel.length > 0 ? (
                <>
                  {RouterModel.map((res, i) => (
                    <Route
                      key={i}
                      path={res.routerPath}
                      element={res.routerComponent}
                    />
                  ))}
                </>
              ) : (
                <></>
              )}
            </Routes>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
}

export default RouterIndex;
