import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

function RegisterMemberPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
      title: "คุณต้องการส่งข้อมูลถึงเราใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่ใช่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.Member, data);
        if (res.data.status === true) {
          Swal.fire("ส่งข้อมูลสำเร็จ", "", "success");
          //set time out 2sec and link to /login-member
          setTimeout(() => {
            window.open(
              "https://thaisecuritycenter-member.suganya-profiles.com/",
              "_blank"
            );
          }, 2000);
        } else {
          Swal.fire("ส่งข้อมูลไม่สำเร็จ", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("ส่งข้อมูลไม่สำเร็จ", "", "info");
      }
    });
  };
  return (
    <div>
      {" "}
      <h2
        className="text-xl mb-2 mt-6 text-amber-500"
        style={{
          fontFamily: "Kanit, sans-serif",
          fontSize: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        สมัครสมาชิก
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "50%",
          marginTop: "20px",
          border: "1px solid #FFD700",
          //shadow
          boxShadow: `
          rgba(255, 215, 0, 0.25) 0px 50px 100px -20px,
          rgba(255, 215, 0, 0.3) 0px 30px 60px -30px,
          rgba(255, 215, 0, 0.35) 0px -2px 6px 0px inset
        `,
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-600 font-bold mb-2"
                  htmlFor="grid-password"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="abc@gmail.com"
                  name="email"
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-600 font-bold mb-2"
                  htmlFor="grid-password"
                >
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="ใส่รหัสผ่านของคุณ"
                  name="password"
                  onChange={handleChangePW}
                />
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-600 font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  ยืนยันรหัสผ่าน
                </label>
                <input
                  type="password"
                  className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                  className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                  className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                  className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
              sitekey="6Lcp8vspAAAAAIrZ7yBzECji_EUwlI9VOF7RJsL-"
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
            <button className="btn btn-warning" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterMemberPage;
