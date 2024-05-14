import { Layout } from "antd";
import React, { useEffect, useState } from "react";
const { Footer } = Layout;
import logo from "../../assets/icon/logonew.png";
import { PhoneFilled, MailFilled } from "@ant-design/icons";

function FooterComponent() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
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
      style={{
        marginTop: "50px",
      }}
    >
      <div
        className="footer  bg-base-300 text-base-content"
        style={{
          width: "100%",
          height: "30px",
          display: "flex",
          justifyContent: windowWidth < 786 ? "center" : null,
        }}
      >
        <div
          style={{
            width: "90%",
            height: "20px",
            display: "flex",
            justifyContent: windowWidth < 768 ? "center" : "flex-end",
            marginTop: "10px",
          }}
        >
          <p
            style={{
              fontSize: windowWidth < 768 ? "12px" : "16px",
              color: "#686868",
            }}
          >
            หน้าหลัก |
          </p>
          <p
            style={{
              fontSize: windowWidth < 768 ? "12px" : "16px",
              color: "#686868",
            }}
          >
            ค้นหา |
          </p>
          <p
            style={{
              fontSize: windowWidth < 768 ? "12px" : "16px",
              color: "#686868",
            }}
          >
            โฆษณากับเรา |
          </p>
          <p
            style={{
              fontSize: windowWidth < 768 ? "12px" : "16px",
              color: "#686868",
            }}
          >
            ติดต่อเรา
          </p>
        </div>
      </div>

      <footer className="footer  bg-base-300 text-base-content">
        <div
          style={{
            width: windowWidth < 768 ? "90%" : "80%",
            // border: "1px solid red",
            display: "flex",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <div className="divider"></div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 "
            style={{
              display: windowWidth < 768 ? "grid" : "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                width: windowWidth < 768 ? "100%" : "30%",
                height: "auto",
                // border: "1px solid red",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // border: "1px solid blue",
                  marginRight: windowWidth < 768 ? null : "50px",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <div>
                  <p
                    style={{
                      padding: "5px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: windowWidth < 768 ? "14px" : "18px",
                    }}
                  >
                    บริการของเรา
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    รายชื่อบริษัทรักษาความปลอดภัยทั้งหมด
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    ข่าวสารและบทความ
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    โปรโมทบริษัทรักษาความปลอดภัยของคุณ
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    คำถามที่พบบ่อย
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: windowWidth < 768 ? "100%" : "30%",
                height: "auto",
                // border: "1px solid red",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // border: "1px solid red",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <div>
                  <p
                    style={{
                      padding: "5px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: windowWidth < 768 ? "14px" : "18px",
                    }}
                  >
                    บริษัทของเรา
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    โฆษณากับเรา
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    เกี่ยวกับเรา
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    ติดต่อเรา
                  </p>
                  <p
                    style={{
                      color: "#686868",
                      padding: "5px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    ติดต่อลงโฆษณา
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: windowWidth < 768 ? "100%" : "40%",
                height: "auto",
                // border: "1px solid red",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  // border: "1px solid black",
                  textAlign: windowWidth < 768 ? "center" : "right", // ทำให้ข้อความชิดขวา
                  width: "100%",
                  marginLeft: windowWidth < 768 ? "auto" : "auto",
                  marginTop: "20px",
                }}
              >
                <div>
                  <img
                    src={logo}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: windowWidth < 768 ? "35%" : "auto",
                      marginBottom: "10px",
                    }}
                  ></img>
                </div>

                <div
                // style={{
                //   textAlign: windowWidth < 768 ? "center" : "right", // ทำให้ข้อความชิดขวา
                // }}
                >
                  <p
                    style={{
                      fontSize: windowWidth < 768 ? "14px" : "20px",
                      // marginBottom: windowWidth < 768 ? "14px" : "20px","10px",
                    }}
                  >
                    Thai Security ยินดีให้บริการ
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: windowWidth < 768 ? "center" : "flex-end",
                  }}
                >
                  <PhoneFilled
                    style={{
                      fontSize: windowWidth < 768 ? "14px" : "25px",
                      color: "#E1B200",
                      marginRight: "10px",
                    }}
                  />{" "}
                  <p
                    style={{
                      fontSize: windowWidth < 768 ? "14px" : "20px",
                    }}
                  >
                    ติดต่อโฆษณา : 082 479 4746{" "}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: windowWidth < 768 ? "center" : "flex-end",
                  }}
                >
                  <MailFilled
                    style={{
                      fontSize: windowWidth < 768 ? "14px" : "25px",
                      color: "#E1B200",
                      marginRight: "10px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: windowWidth < 768 ? "14px" : "20px",
                    }}
                  >
                    ads2thai@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="bg-yellow-500"
        style={{
          // marginTop: "20px",
          textAlign: "center",
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: windowWidth < 768 ? "12px" : "16px",
        }}
      >
        Copyright © 2024 rev.00 - All rights reserved by {"  "}
        <a
          href="https://suganya-profiles.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#FFF6AE", textDecoration: "none" }}
        >
          {"  "} Syganya.P
        </a>
      </div>
    </div>
  );
}

export default FooterComponent;
