import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
const { Header, Content, Footer, Sider } = Layout;
import { Route, Routes } from "react-router-dom";
import { RouterModel } from "../models/RouterModel";
import NavbarComponent from "../components/layout/NavbarComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
// import SidebarComponent from "../components/SidebarComponent/SidebarComponent";
import "../assets/scss/style.scss";
import LoginPage from "../pages/LoginPage";

import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import TopNavbar from "../components/layout/TopNavbar";

function RouterIndex() {
  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [role, setRole] = useState("");

  // const token = localStorage.getItem("token");
  // if (!token) {
  //   return <LoginPage />;
  // }

  // // console.log(token);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await API.get(ApiRouter.authen, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     if (res.data.status === true) {
  //       setName(`${res.data.data.name} ${res.data.data.surname}`);
  //     } else {
  //       localStorage.removeItem("token");
  //       window.location.href = "/";
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {/* <div
        style={{
          backgroundColor: "#FFFFFF",
          width: "80%",
          margin: "auto",
        }}
      > */}
        <div>
          <TopNavbar />
          <NavbarComponent />
        </div>

        <div
          style={{
            // padding: 24,[]
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
      {/* </div>{" "} */}
      <FooterComponent />
    </>
  );
}

export default RouterIndex;
