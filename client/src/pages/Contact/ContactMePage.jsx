import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import ReCAPTCHA from "react-google-recaptcha";
import { Divider, Typography, Table } from "antd";

const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";

import LOGO from "../../assets/image/logo1.png";
import Facebook from "../../assets/icon/social/Facebook.png";
import Fax from "../../assets/icon/social/Fax.png";
import Gmail from "../../assets/icon/social/Gmail2.png";
import Instagram from "../../assets/icon/social/Instagram.png";
import Phone from "../../assets/icon/social/Phone.png";
import Line from "../../assets/icon/social/Line.png";

function ContactMePage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const icons = [
    {
      name: "082-479-4746",
      icon: Phone,
      link: "tel:082-479-4746",
    },
    {
      name: "02-002-1847",
      icon: Fax,
      link: "tel:02-002-1847",
    },
    {
      name: "securitycenter",
      icon: Line,
      link: "https://line.me/ti/p/akKfClgbCQ",
    },
    {
      name: "บริการลงโฆษณา บริษัทรปภ. - Thaisecuritycenter.com",
      icon: Facebook,
      link: "https://www.facebook.com/thaisecure.ad?mibextid=JRoKGi",
    },
    {
      name: "thaisecuritycenter",
      icon: Instagram,
      link: "https://www.instagram.com/thaisecuritycenter/?igsh=MXN0aTR2bzB3MGRvcA%3D%3D",
    },
    {
      name: "ads2thai@gmail.com",
      icon: Gmail,
      link: "mailto:ads2thai@gmail.com",
    },
  ];
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`Copied to clipboard: ${text}`);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
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

    Swal.fire({
      icon: "question",
      title: "คุณต้องการส่งข้อมูลถึงเราใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่ใช่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.ContactMe, data);
        if (res.data.status === true) {
          Swal.fire("ส่งข้อมูลสำเร็จ", "", "success");
          //set time out 2 sec
          setTimeout(() => {
            window.location.reload();
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
    <>
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <h2 className="text-xl mb-2 mt-6 text-amber-500">ติดต่อสอบถามข้อมูล</h2>
        <div className="divider"></div>
      </div>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        style={{
          width: "80%",
          display: windowWidth < 768 ? null : "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          height: "auto",
        }}
      >
        <div
          style={{
            width: windowWidth < 768 ? "100%" : "50%",
            height: "auto",
            // border: "1px solid black",
          }}
        >
          <img
            src={LOGO}
            style={{
              width: "200px",
              height: "200px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              color: "black",
              marginBottom: "20px",
            }}
          >
            สอบถามข้อมูล :
          </p>
          {icons.map((icon, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "80%",
                  margin: "auto",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => copyToClipboard(icon.name)}
              >
                <img
                  src={icon.icon}
                  style={{
                    width: "40px",
                    height: "auto",
                    marginRight: "20px",
                  }}
                  alt={icon.name}
                />
                <a href={icon.link} target="_blank" rel="noopener noreferrer">
                  {icon.name}
                </a>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: windowWidth < 768 ? "100%" : "50%",
            height: "auto",
            // border: "1px solid black",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              สำหรับผู้ขอรับบริการ
            </h6> */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ชื่อบริษัท
                  </label>
                  <input
                    type="text"
                    className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="ชื่อบริษัท"
                    name="company"
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ชื่อ - นามสกุล
                  </label>
                  <input
                    type="text"
                    className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="ชื่อ - นามสกุล"
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
                    ข้อความ
                  </label>

                  <textarea
                    className="border-2 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="detail"
                    rows="4" // สามารถปรับความสูงได้ตามต้องการ
                    placeholder="ใส่ข้อความของคุณที่นี่" // เพิ่ม placeholder ตามต้องการ
                  ></textarea>
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
    </>
  );
}
export default ContactMePage;
