import React, { useState, useEffect } from "react";
import SubBannerComponent from "../BannerComponent/SubBannerComponent";
import facebookImage from "../../assets/image/facebook.png";
import facebookImage2 from "../../assets/image/facebook2.png";

import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ShowNewMainPage() {
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

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.ArticleNewsItems + "/4");
      if (res.data.status === true) {
        // setLoading(false);
        if (res.data.data.length === 0) {
          // setLoading(false);
        } else {
          let dataArr = [];
          res.data.data.map((item) => {
            if (item.published === 1) {
              dataArr.push(item);
            }
          });

          setData(dataArr);

          const itemsWithImages = await Promise.all(
            dataArr.map(async (item) => {
              try {
                const imageRes = await API.post(
                  ApiRouter.ArticleImage,
                  {
                    filename: item.link,
                  },
                  {
                    responseType: "arraybuffer",
                  }
                );
                const blob = new Blob([imageRes.data], { type: "image/jpeg" });
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
          setData(itemsWithImages);
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
    };
    fetchData();
    // setIsSubmit(false);
  }, []);

  return (
    <>
      <div
        style={{
          //   display: "flex",
          margin: "auto",
          width: "90%",
          height: "auto",
          marginTop: "20px",
          //   border: "1px solid black",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2"
          style={{
            width: "100%",
            display: windowWidth < 768 ? null : "flex",
            justifyContent: "center",
            // border: "1px solid blue",
          }}
        >
          <div
            style={{
              width: windowWidth < 768 ? "100%" : "100%",
              height: "100%",
              // background: windowWidth < 768 ? null : "#000000",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                margin: "auto",
                marginBlock: "auto",
                marginTop: "6px",
              }}
            >
              <SubBannerComponent page="home" />
            </div>
          </div>
        </div>{" "}
        <div
          style={{
            width: "100%",
            // height: windowWidth < 768 ? "130px" : "220px",
            height :"auto",
            justifyContent: "center",
            marginTop: windowWidth < 768 ? "20px" : "20px",
            display: "flex",
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1"
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              display: windowWidth < 768 ? null : "flex",
            }}
          >
            <div
              style={{
                width: windowWidth < 768 ? "100%" : "30%",
                height: "100%",
                marginRight: "10px",
              }}
            >
              <Link
                to="https://www.facebook.com/thaisecure.ad?mibextid=JRoKGi"
                target="_blank"
              >
                <img
                  src={windowWidth < 768 ? facebookImage2 : facebookImage}
                  alt="Facebook"
                />
              </Link>
            </div>

            <div
              className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-1"
              style={{
                width: windowWidth < 768 ? "100%" : "70%",
                height: "100%",
                marginRight: "10px",
              }}
            >
              {data.map((item) => {
                return (
                  <Link key={item.id} to={`/news/${item.article_id}`}>
                    <div key={item.id}>
                      <img
                        src={item.img}
                        style={{
                          width: "100%",
                          height: "auto",
                          padding: "5px",
                        }}
                      />
                      <p
                        style={{
                          // textAlign: "center",
                          marginLeft: "10px",
                          fontSize: windowWidth < 768 ? "10px" : "16px",
                          fontWeight: "bold",
                          // สีเหลือง
                          color: "#E19D00",
                        }}
                      >
                        {item.topic.length > 30
                          ? item.topic
                              .substring(0, 30)
                              .replace(/&quot;/g, "''") +
                            "..." +
                            "..."
                          : item.topic}
                      </p>
                      <p
                        style={{
                          // textAlign: "center",
                          marginLeft: "10px",
                          fontSize: windowWidth < 768 ? "8px" : "12px",
                        }}
                      >
                        {item.topic.length > 50
                          ? item.topic
                              .substring(0, 50)
                              .replace(/&quot;/g, "''") +
                            "..." +
                            "..."
                          : item.topic}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
        </div>
        <div
          style={{
            width: "100%",
            height: "auto",
            marginTop:  windowWidth < 768 ? null : "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/news">
            <button
              // className="btn btn-outline btn-sm"
              //   onClick={handleShowMore}
              style={{
                backgroundColor: "#FFD700",
                color: "#000000",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                width: windowWidth < 768 ? "70px" : "auto",
                height: windowWidth < 768 ? "20px" : "auto",
                boxShadow: "0 0 5px #868686",
                fontSize: windowWidth < 768 ? "8px" : "16px",
              }}
            >
              ดูทั้งหมด
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ShowNewMainPage;
