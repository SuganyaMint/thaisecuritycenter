import React, { useState, useEffect } from "react";
import topIcon from "../../assets/icon/top.png";
import "../../assets/scss/style.scss";
import tolIcon from "../../assets/icon/Group 17tol.png";
import starIcon from "../..//assets/icon/star2.png";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import SkeletonComponent from "../SkeletonComponent/SkeletonComponent";

function TopCompany() {
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

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [isSubmit, setIsSubmit] = useState(false);

  // const [company_id, setcompany_id] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.CompanyClient);
      if (res.data.status === true) {
        setLoading(false);
        if (res.data.data.length === 0) {
          setLoading(false);
          setData(res.data.data);
        } else {
          const itemsWithImages = await Promise.all(
            res.data.data.map(async (item) => {
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
        // Swal.fire({
        //   title: "Error!",
        //   text: "เกิดข้อผิดพลาด ไม่สามารถดึงข้อมูลได้ โปรดลองใหม่อีกครั้ง",
        //   icon: "warning",
        //   showCancelButton: true,
        //   confirmButtonColor: "#3085d6",
        //   cancelButtonColor: "#d33",
        //   cancelButtonText: "ยกเลิก",
        //   confirmButtonText: "ลองใหม่อีกครั้ง",
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     Swal.fire({
        //       title: "กำลังโหลด",
        //       text: "โปรดรอสักครู่...",
        //       icon: "info",
        //       showConfirmButton: false,
        //       allowOutsideClick: false,
        //     });
        //     setTimeout(() => {
        //       window.location.reload();
        //     }, 1000);
        //   } else {
        //     Swal.fire({
        //       title: "กำลังยกเลิกและกลับสู่หน้าหลัก",
        //       text: "โปรดรอสักครู่...",
        //       icon: "info",
        //       showConfirmButton: false,
        //       allowOutsideClick: false,
        //     });
        //     setTimeout(() => {
        //       window.location.href = "/";
        //     }, 1000);
        //   }
        // });
      }
    };
    fetchData();
  }, []);


  const ShowCard = () => {
    return (
      <>
        {data.map((item, index) => (
          <Link key = "company_id" to={`/company/${item.company_id}`}>
            <div key={index}>
              {windowWidth < 768 ? (
                <>
                  <div
                    className="card bg-base-100 mb-4"
                    style={{
                      borderRadius: "10px",
                      border:
                        item.star === 1
                          ? "1px solid #FFD700"
                          : "1px solid #868686",
                      boxShadow:
                        item.star === 1
                          ? "5px 5px 10px #FFD700"
                          : "5px 5px 10px #868686",
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    {item.star === 1 ? (
                      <div style={{ position: "absolute", top: 0, right: 0 }}>
                        <img
                          className={"shake-small"}
                          src={starIcon}
                          alt="Movie"
                          style={{
                            width: "70px",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "10px 10px 0 0",
                          }}
                        />
                      </div>
                    ) : null}

                    <figure>
                      <img
                        src={item.img}
                        alt="Movie"
                        style={{
                          width: "250px",
                          height: "auto",
                          // objectFit: "cover",
                          marginTop: "40px",
                        }}
                      />
                    </figure>
                    <div className="card-body" style={{ position: "relative" }}>
                      <div style={{ width: "100%" }}>
                        <p
                          style={{
                            fontSize: "14px",
                          }}
                          className="card-title"
                        >
                          {item.company_name}
                        </p>
                      </div>

                      <div style={{ width: "100%" }}>
                        <p
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>

                      <div style={{ width: "100%" }}>
                        <p
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          ที่อยู่ {item.fullAddress}
                        </p>
                      </div>

                      <div
                        style={{
                          width: "80%",
                          display: "flex",
                        }}
                      >
                        <img
                          src={tolIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                            cursor: "pointer", // เพิ่ม cursor: pointer เพื่อให้เป็นตัวบ่งชี้ที่สามารถคลิกได้
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(item.mobile); // คัดลอก item.mobile ไปยังคลิปบอร์ด
                          }}
                        />
                        <p
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          {item.mobile}
                        </p>
                      </div>
                      <div
                        style={{
                          height: "50px",
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                        }}
                      >
                        <button
                          className="btn btn-active btn-sm"
                          style={{
                            backgroundColor: "#FFD700",
                            color: "#000000",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                            width: "80px",
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            boxShadow: "0 0 5px #868686",
                            fontSize: "12px",
                          }}
                        >
                          ดูเพิ่มเติม
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="card card-side bg-base-100 mb-4"
                    style={{
                      borderRadius: "10px",
                      border:
                        item.star === 1
                          ? "1px solid #FFD700"
                          : "1px solid #868686",
                      boxShadow:
                        item.star === 1
                          ? "5px 5px 10px #FFD700"
                          : "5px 5px 10px #868686",
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <figure style={{ width: "90%" }}>
                        <img
                          src={item.img}
                          alt="Movie"
                          style={{
                            width: "90%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "10px 10px 0 0",
                          }}
                        />
                      </figure>
                    </div>

                    <div
                      style={{
                        width: "70%",
                      }}
                    >
                      <div
                        className="card-body"
                        style={{ position: "relative" }}
                      >
                        {item.star === 1 ? (
                          <div
                            style={{ position: "absolute", top: 0, right: 0 }}
                          >
                            <img
                              className={"shake-large"}
                              src={starIcon}
                              alt="Movie"
                              style={{
                                width: "100px",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: "10px 10px 0 0",
                              }}
                            />
                          </div>
                        ) : null}

                        <div style={{ width: "80%" }}>
                          <h2 className="card-title">{item.company_name}</h2>
                        </div>

                        <div style={{ width: "80%" }}>
                          <p>{item.description}</p>
                        </div>

                        <div style={{ width: "80%" }}>
                          <p>ที่อยู่ {item.fullAddress}</p>
                        </div>

                        <div
                          style={{
                            width: "80%",
                            display: "flex",
                          }}
                        >
                          <img
                            src={tolIcon}
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "10px",
                              cursor: "pointer", // เพิ่ม cursor: pointer เพื่อให้เป็นตัวบ่งชี้ที่สามารถคลิกได้
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(item.mobile); // คัดลอก item.mobile ไปยังคลิปบอร์ด
                            }}
                          />
                          <p>{item.mobile}</p>
                        </div>

                        <div
                          style={{
                            height: "50px",
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "right",
                          }}
                        >
                          <button
                            className="btn btn-active btn-sm"
                            style={{
                              backgroundColor: "#FFD700",
                              color: "#000000",
                              border: "none",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              cursor: "pointer",
                              width: "100px",
                              position: "absolute",
                              bottom: 10,
                              right: 10,
                              boxShadow: "0 0 5px #868686",
                            }}
                          >
                            ดูเพิ่มเติม
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Link>
        ))}
      </>
    );
  };

  const DetailList = () => {
    const renderCards = () => {
      const Cards = [];
      Cards.push(<ShowCard key={1} />);
      return Cards;
    };

    return <>{renderCards()}</>;
  };

  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div
          style={{
            width: "90%",
            margin: "auto",
          }}
        >
          <div
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={topIcon}
              alt="topIcon"
              className={windowWidth < 768 ? "shake-small" : "shake-large"} // เลือกคลาส animation ตามเงื่อนไขขนาดหน้าจอ
              style={{
                width: windowWidth < 768 ? "250px" : "400px",
                height: "auto",
              }}
            />
          </div>

          <DetailList />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Link to="/company">
              <button
                className="btn btn-outline btn-sm"
                //   onClick={handleShowMore}
                style={{
                  backgroundColor: "#FFD700",
                  color: "#000000",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  width: "100px",
                  boxShadow: "0 0 5px #868686",
                }}
              >
                ดูทั้งหมด
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopCompany;
