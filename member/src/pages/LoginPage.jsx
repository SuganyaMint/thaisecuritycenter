import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ApiUrl from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import Swal from "sweetalert2";
import IMG2 from "../assets/loginPaper2.png";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const loginResponse = await ApiUrl.post(ApiRouter.login, values);
      if (loginResponse.data.status === true) {
        localStorage.setItem("token", loginResponse.data.token);
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You are now logged in",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please check your username and password",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
      style={{
        display: windowWidth < 786 ? null : "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: windowWidth < 786 ? "100%" : "50%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          // border: "1px solid #787A79",
        }}
      >
        <img
          src={IMG2}
          alt="SecurityBro"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div
        style={{
          width: windowWidth < 786 ? "100%" : "50%",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "60%",
            //center
            margin: "auto",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#E9B800",
              marginBottom: "20px",
            }}
          >
            เข้าสู่ระบบ
          </p>

          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                style={{
                  height: "50px",
                  width: "100%",
                  border : "1px solid #898989",
                }}
                prefix={<UserOutlined />}
                placeholder="อีเมลล์"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                style={{
                  height: "50px",
                  width: "100%",
                  border : "1px solid #898989",
                }}
                prefix={<LockOutlined />}
                placeholder="รหัสผ่าน"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item>

              <button
                className="btn btn-warning"
                htmlType="submit"
                loading={loading}
                style={{
                  width: "100%",
                  height: "30px",
                  borderRadius: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#E9B800",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                เข้าสู่ระบบ
              </button>
            </Form.Item>
          </Form>
          <div
            style={{
              // width: "50%",
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              margin: "auto",
              width: windowWidth < 786 ? "100%" : "50%",
              marginBottom: "50px",
            }}
          >
            <p
              style={{
                marginRight: "10px",
              }}
            >
              ยังไม่มีบัญชี?
            </p>
            <Link to="/register">
              <p
                style={{
                  color: hover ? "#FFD700" : "#CFAF00",
                  cursor: "pointer",
                  textDecoration: "none", // ปิดการขีดเส้นใต้
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                สมัครสมาชิก
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
