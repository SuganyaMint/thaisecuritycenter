import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
import { Typography, Image } from "antd";

const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";

import visited_icon from "../../assets/icon/visited_icon.jpeg";

import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import "../../assets/scss/style.scss";

function DetailCompanyPage() {
  const { company_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [IFrame_Google, setIFrame_Google] = useState("");
  const [dataImage, setDataImage] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCompany = await API.get(ApiRouter.Company + company_id);
        let dataCompany = getCompany.data.data;
        setData(dataCompany);
        setIFrame_Google(getCompany.data.data.IFrame_Google);

        const getDataImage = await API.get(
          ApiRouter.CompanyImageComID + company_id
        );
        const dataImage = getDataImage.data.data;

        if (getCompany.data.status === true) {
          if (dataCompany.length === 0) {
            setDataImage(dataCompany);
            console.log(dataCompany);
          } else {
            const itemsWithImages = await Promise.all(
              dataImage.map(async (item) => {
                try {
                  const imageRes = await API.post(
                    ApiRouter.CompanyImage,
                    {
                      filename: item.link,
                    },
                    {
                      responseType: "arraybuffer",
                    }
                  );
                  const blob = new Blob([imageRes.data], {
                    type: "image/jpeg",
                  });
                  const imageUrl = URL.createObjectURL(blob);
                  return {
                    ...item,
                    img: imageUrl,
                    key: item.id,
                  };
                } catch (error) {
                  console.error("Error fetching image:", error);
                  return item;
                }
              })
            );
            console.log(itemsWithImages);
            if (itemsWithImages[0].img === undefined) {
              setLoading(true);
            } else {
              setDataImage(itemsWithImages);
              setLoading(false);
            }
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: "เกิดข้อผิดพลาด ไม่สามารถดึงข้อมูลได้ โปรดลองใหม่อีกครั้ง",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก",
            confirmButtonText: "ลองใหม่อีกครั้ง",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "กำลังโหลด",
                text: "โปรดรอสักครู่...",
                icon: "info",
                showConfirmButton: false,
                allowOutsideClick: false,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              Swal.fire({
                title: "กำลังยกเลิกและกลับสู่หน้าหลัก",
                text: "โปรดรอสักครู่...",
                icon: "info",
                showConfirmButton: false,
                allowOutsideClick: false,
              });
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderGoogleMapIframe = () => {
    const linkRegex = /src="?([^"\s]+)"?/; // This regex matches a src attribute that may or may not be enclosed in quotes

    const match = IFrame_Google.match(linkRegex);

    if (match) {
      const linkIframe = decodeURIComponent(match[1].replace(/&amp;/g, "&"));

      return (
        <iframe
          src={linkIframe.replace(/&quot;/g, "")} // Remove additional quotes
          style={{
            border: 0,
            width: "90%",
            height: "300px",
            margin: "auto",
          }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      );
    } else {
      console.error("No match found for iframe src."); // Error log if no match is found
      return null;
    }
  };

  const interval = 3000;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeIn, setFadeIn] = useState(true); // เพิ่ม state สำหรับจัดการ fade-in effect

  useEffect(() => {
    const timerId = !isPaused
      ? setInterval(() => {
          setFadeIn(false); // ตั้งค่า fade-in เป็น false เพื่อเริ่มต้น effect
          setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
              prevIndex + 1 === dataImage.length ? 0 : prevIndex + 1
            );
            setFadeIn(true); // ตั้งค่า fade-in กลับเป็น true เมื่อรูปเปลี่ยน
          }, 500); // Delay 500 ms ก่อนแสดงรูปใหม่เพื่อให้มีเวลาสำหรับ fade-out
        }, interval)
      : null;

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isPaused, dataImage.length, interval]);

  const handleImageClick = (index) => {
    setFadeIn(false); // เริ่ม fade-out เมื่อมีการคลิก
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setFadeIn(true); // หลังจาก 2 วินาที กลับเข้าสู่การเลื่อนอัตโนมัติ
      }, 3000);
    }, 500); // Delay 500 ms ก่อนแสดงรูปใหม่
  };

  return (
    <>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div
          style={{
            width: windowWidth < 768 ? "100%" : "90%",
            height: "auto",
            margin: "auto",
            // border: "1px solid black",
          }}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
            style={{
              width: "100%",
              marginTop: "20px",
              display: windowWidth < 768 ? "grid" : "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                // width: windowWidth < 768 ? "100%" : "70%",
                width:
                  windowWidth < 768
                    ? "100%"
                    : windowWidth < 1500
                    ? "60%"
                    : "70%",
                fontSize: "20px",
                fontWeight: "bold",
                padding: "10px",
                textAlign: windowWidth < 768 ? "center" : null,
              }}
            >
              {data.company_name}
            </div>

            <div
              style={{
                width:
                  windowWidth < 768
                    ? "100%"
                    : windowWidth < 1500
                    ? "40%"
                    : "30%",
                display: "flex",
                // margin: "auto",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {windowWidth < 768 ? (
                <button className="bg-red-600 hover:bg-red-900 text-white font-bold py-1 px-2 text-sm rounded ml-4">
                  คลิ๊กจ้าง รปภ./สมัคร รปภ.
                </button>
              ) : (
                <button
                  className="bg-red-600 hover:bg-red-900 text-white font-bold py-1 px-2 text-sm rounded mr-4"
                  style={{
                    width: "200px",
                    height: "40px",
                  }}
                >
                  คลิ๊กจ้าง รปภ./สมัคร รปภ.
                </button>
              )}

              <img
                src={visited_icon}
                style={{
                  width: windowWidth < 768 ? "30px" : "40px",
                  height: windowWidth < 768 ? "30px" : "40px",
                  margin: "auto",
                  marginRight: windowWidth < 768 ? "-20px" : "-30px",
                }}
              ></img>

              <div
                style={{
                  paddingLeft: "5px",
                  fontSize: windowWidth < 768 ? "16px" : "20px",
                  color: "#E48A00",
                  margin: "auto",
                }}
              >
                {data.visited.toLocaleString()} views
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
            style={{
              width: "100%",
              height: "auto",
              display: windowWidth < 768 ? "grid" : "flex",
              justifyContent: "space-between",
              padding: "10px",
              // border: "1px solid red",
            }}
          >
            <div
              style={{
                width: windowWidth < 768 ? "100%" : "50%",
                height: "100%",
                // border: "2px solid green",
                overflow: "hidden", // ห้ามให้เนื้อหายื่นออกไปนอก div
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row", // จัดให้เนื้อหาอยู่ในแนวนอน
                  flexWrap: "wrap", // ทำให้เนื้อหาห่อหุ้มได้หากไม่พอดี
                }}
              >
                <div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <img
                      src={dataImage[currentImageIndex].img}
                      alt={`Image ${currentImageIndex}`}
                      style={{
                        maxWidth: windowWidth < 768 ? "300px" : "600px",
                        maxHeight: "400px",
                        width: "auto",
                        height: "auto",
                        opacity: fadeIn ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      // margin: "auto",
                    }}
                  >
                    {dataImage.map((item, index) => (
                      <img
                        key={index}
                        src={item.img}
                        alt={`Thumbnail ${index}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          padding: "5px",
                          border:
                            index === currentImageIndex
                              ? "2px solid blue"
                              : "none",
                          cursor: "pointer",
                          opacity: 0.6,
                          transition: "opacity 0.3s",
                        }}
                        onClick={() => handleImageClick(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: windowWidth < 768 ? "100%" : "50%",
                height: "auto",
                // border: "1px solid green",
              }}
            >
              <div
                style={{
                  width: "90%",
                  padding: "10px",
                  margin: "auto",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: windowWidth < 768 ? "16px" : "18px",
                    fontWeight: "bold",
                    color: "#E48A00",
                  }}
                >
                  {data.company_name}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "20%",
                    height: "auto",
                    right: "0",
                  }}
                >
                  <p
                    style={{
                      color: "#E48A00",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    ที่อยู่ :
                  </p>
                </div>
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  {" "}
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    {data.address} {data.district} {data.amphoe} {data.province}{" "}
                    {data.zipcode}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "20%",
                    height: "auto",
                    right: "0",
                  }}
                >
                  <p
                    style={{
                      color: "#E48A00",
                      fontSize: windowWidth < 768 ? "14px" : "16px",
                    }}
                  >
                    เว็บไซต์ :
                  </p>
                </div>
                <div style={{}}>
                  {" "}
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    {data.website}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "20%",
                    height: "auto",
                    right: "0",
                  }}
                >
                  <p
                    style={{
                      color: "#E48A00",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    ติดต่อ:
                  </p>
                </div>

                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    {data.mobile}
                  </p>

                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    {data.phone}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "20%",
                    height: "auto",
                    right: "0",
                  }}
                >
                  <p
                    style={{
                      color: "#E48A00",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    Line :
                  </p>
                </div>
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    {data.line}
                  </p>
                </div>
                
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "20%",
                    height: "auto",
                    right: "0",
                  }}
                >
                  <p
                    style={{
                      color: "#E48A00",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    Tiktok :
                  </p>
                </div>
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    {data.tiktok}
                  </p>
                </div>
                
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "20%",
                    height: "auto",
                    right: "0",
                  }}
                >
                  <p
                    style={{
                      color: "#E48A00",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    อีเมล์ :
                  </p>
                </div>
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: windowWidth < 768 ? "12px" : "16px",
                    }}
                  >
                    {data.email}
                  </p>{" "}
                </div>
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                  color: "red",
                  fontSize: windowWidth < 768 ? "12px" : "14px",
                }}
              >
                {" "}
                **อย่าลืม!! แจ้งว่าเห็นโฆษณาจาก thaisecuritycenter นะครับ**
              </p>

              <div
                style={{
                  marginBottom: "30px",
                }}
              >
                {renderGoogleMapIframe()}
              </div>
            </div>
          </div>

          <div
            className="bg-yellow-500"
            style={
              //bg สีเทา
              {
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }
            }
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#FFFF",
              }}
            >
              คำอธิบาย
            </p>
          </div>
          <div
            style={{
              padding: "10px",
              marginTop: "50px",
            }}
          >
            <div
              className="divContainer"
              dangerouslySetInnerHTML={{
                __html: data.detail,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default DetailCompanyPage;
