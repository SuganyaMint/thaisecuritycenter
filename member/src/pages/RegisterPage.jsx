import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ApiUrl from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import Swal from "sweetalert2";
import IMG2 from "../assets/loginPaper2.png";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

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

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePW = (e) => {
    const { name, value } = e.target;
    setPassword(value);
  };
  const handleChangeConPW = (e) => {
    const { name, value } = e.target;
    setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    const data = {};
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Verify reCAPTCHA
    if (!recaptchaValue) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาบอกเราว่าคุณไม่ใช่บอท",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง",
      });
      return;
    }

    Swal.fire({
      icon: "question",
      title: "คุณต้องการสมัครสมาชิกใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่ใช่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await ApiUrl.post(ApiRouter.Member, data);
        if (res.data.status === true) {
          Swal.fire("ส่งข้อมูลสำเร็จ", "", "success");
          //set time out 2sec and link to /login-member
          setTimeout(() => {
            window.location.href = "https://thaisecuritycenter-member.suganya-profiles.com/";
          }, 2000);
          
        } else {
          Swal.fire("มีอีเมลล์นี้เป็นสมาชิกอยู่แล้ว", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("สมัครสมาชิกไม่สำเร็จ", "", "info");
      }
    });
  };
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
            สมัครสมาชิก
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap ">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    อีเมลล์
                  </label>
                  <input
                    type="email"
                    className="border-2 px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="abc@gmail.com"
                    name="email"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    className="border-2 px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="ใส่รหัสผ่านของคุณ"
                    name="password"
                    onChange={handleChangePW}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    ยืนยันรหัสผ่าน
                  </label>
                  <input
                    type="password"
                    className="border-2 px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="ยืนยันรหัสผ่านของคุณ"
                    name="confirmPassword"
                    onChange={handleChangeConPW}
                  />
                </div>
              </div>
              {password !== confirmPassword && confirmPassword !== "" ? (
                <p
                  style={{
                    color: "red",
                    //center text
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  ***รหัสผ่านของคุณไม่ตรงกัน***
                </p>
              ) : (
                <></>
              )}
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    className="border-2 px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="ชื่อ"
                    name="name"
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    นามสกุล
                  </label>
                  <input
                    type="text"
                    className="border-2 px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="นาสกุล"
                    name="surname"
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    เบอร์โทร
                  </label>
                  <input
                    type="text"
                    className="border-2 px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="0945455xxx"
                    name="phone"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                marginBottom: "20px",
                marginLeft: "20px",
              }}
            >
              <ReCAPTCHA
                // sitekey="6LdgkVwpAAAAAKv30YifOP_vtl9bEeOKUPKZc0dm"
                sitekey="6LeEmPwpAAAAAI7mq3wr4aEB7f2xbFAsUaI82RfC"
                onChange={(value) => setRecaptchaValue(value)}
              />
            </div>
            <div
              style={{
                //center button
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <button
                className="btn btn-warning"
                type="submit"
                style={{
                  width: "90%",
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
                สมัครสมาชิก
              </button>
            </div>
          </form>
          <Divider />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
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
              มีบัญชีอยู่แล้ว?
            </p>

            <Link to="/">
              <p
                style={{
                  color: hover ? "#FFD700" : "#CFAF00",
                  cursor: "pointer",
                  textDecoration: "none", // ปิดการขีดเส้นใต้
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                เข้าสู่ระบบ
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
