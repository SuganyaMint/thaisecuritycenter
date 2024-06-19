import React, { useState, useEffect } from "react";
import GuideComponent from "../components/GuideComponent/GuideComponent";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import { UpCircleOutlined } from "@ant-design/icons";
import SkeletonComponent from "../components/SkeletonComponent/SkeletonComponent";
import SubBannerComponent from "../components/BannerComponent/SubBannerComponent";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CompanyPage from "./Company/CompanyPage";
function SearchCompanyPage() {
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [Geo_N, setGeo_N] = useState([]); //ภาคเหนือ
  const [Geo_NE, setGeo_NE] = useState([]); //ภาคตะวันออกเฉียงเหนือ
  const [Geo_E, setGeo_E] = useState([]); //ภาคตะวันออก
  const [Geo_S, setGeo_S] = useState([]); //ภาคใต้
  const [Geo_W, setGeo_W] = useState([]); //ภาคตะวันตก
  const [Geo_C, setGeo_C] = useState([]); //ภาคกลาง
  const [Geo_BKK, setGeo_BKK] = useState([]); //กรุงเทพมหานคร
  const [nearBKK, setNearBKK] = useState([]); // ใกล้กรุงเทพมหานคร
  const [data, setData] = useState([]);
  const Geo = [
    {
      id: 1,
      name: "ภาคเหนือ",
    },
    {
      id: 2,
      name: "ภาคกลาง",
    },
    {
      id: 3,
      name: "ภาคตะวันออกเฉียงเหนือ",
    },
    {
      id: 4,
      name: "ภาคตะวันตก",
    },
    {
      id: 5,
      name: "ภาคตะวันออก",
    },
    {
      id: 6,
      name: "ภาคใต้",
    },
  ];

  useEffect(() => {
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
      const res = await API.get(ApiRouter.ArticleNewsItems + "/12");
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

  useEffect(() => {
    const fetchData = async () => {
      const near_bkk = await API.get(ApiRouter.NearBKK);
      setNearBKK(near_bkk.data.data);
      const bkk = await API.get(ApiRouter.AmphoeInBKK);
      setGeo_BKK(bkk.data.data);

      Geo.map(async (item) => {
        const data = await API.get(ApiRouter.Geo + String(item.id));

        if (String(item.id) === "1") {
          setGeo_N(data.data.data);
        } else if (String(item.id) === "2") {
          setGeo_C(data.data.data);
        } else if (String(item.id) === "3") {
          setGeo_NE(data.data.data);
        } else if (String(item.id) === "4") {
          setGeo_W(data.data.data);
        } else if (String(item.id) === "5") {
          setGeo_E(data.data.data);
        } else if (String(item.id) === "6") {
          setGeo_S(data.data.data);
        }
      });
    };
    setLoading(false);
    fetchData();
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // เพิ่ม event listener เมื่อ scroll หน้าเว็บ
    window.addEventListener("scroll", toggleVisibility);
    // ลบ event listener เมื่อ component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    // ตรวจสอบว่า scroll ไปยังด้านบนของหน้าเว็บหรือไม่
    if (window.pageYOffset > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <>
          <div id="topview"></div>
          <GuideComponent numImages={4} />
          <SubBannerComponent page="search" />
          <div
            style={{
              width: "90%",
              margin: "auto",
              marginTop: "20px",
              display: "flex",
            }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
              style={{
                width: "100%",
                display: windowWidth < 768 ? null : "flex",
                justifyContent: "center",
                // border: "1px solid blue",
              }}
            >
              <div
                className="bg-white p-4 rounded-lg shadow-md"
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                  justifyContent: "center",
                  // border: "1px solid red",

                  width: windowWidth < 768 ? "100%" : "80%",
                  height: "auto",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4  ">
                  <button className="btn bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer text-m mr-4">
                    ค้นหาจากเขตในกรุงเทพ
                  </button>
                  <button
                    className="btn bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer text-m mr-4"
                    onClick={() => {
                      const nearBkkElement =
                        document.getElementById("nearBkk_id");
                      nearBkkElement.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    ค้นหาในกรุงเทพและปริมณฑล
                  </button>

                  <button
                    className="btn bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer text-m mr-4"
                    onClick={() => {
                      const nearBkkElement = document.getElementById("other");
                      nearBkkElement.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    ค้นหาในต่างจังหวัด
                  </button>
                </div>

                <h2 className="text-xl mb-2 mt-6 text-amber-500">
                  ค้นหาจากเขตในกรุงเทพ
                </h2>

                <div className="divider"></div>
                <div
                  className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {Geo_BKK.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <Link to={`/company/area/bkk/${item.AmphoeID}`}>
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย เขต {item.AmphoeThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        ) : (
                          <Link to={`/company/area/bkk/${item.AmphoeID}`}>
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                                className="text-black hover:text-amber-500 cursor-pointer"
                              >
                                » บริษัทรักษาความปลอดภัย เขต {item.AmphoeThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                  <div id="nearBkk_id"></div>
                </div>

                <h2 className="text-xl mb-2 mt-6 text-amber-500">
                  ค้นหาในกรุงเทพและปริมณฑล
                </h2>
                <div className="divider"></div>

                <div
                  className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {nearBKK.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        ) : (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>{" "}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                  <div id="other"></div>
                </div>

                <h2 className="text-xl mb-2 mt-6 text-amber-500" id="Ggo_N_id">
                  ค้นหาในต่างจังหวัด - ภาคเหนือ
                </h2>
                <div className="divider"></div>
                <div
                  className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {Geo_N.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        ) : (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
                <h2 className="text-xl mb-2 mt-6 text-amber-500">
                  ค้นหาในต่างจังหวัด - ภาคกลาง
                </h2>
                <div className="divider"></div>
                <div
                  className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {Geo_C.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>{" "}
                          </Link>
                        ) : (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
                <h2 className="text-xl mb-2 mt-6 text-amber-500">
                  ค้นหาในต่างจังหวัด - ภาคตะวันออกเฉียงเหนือ
                </h2>
                <div className="divider"></div>
                <div
                  className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {Geo_NE.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>{" "}
                          </Link>
                        ) : (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h2 className="text-xl mb-2 mt-6 text-amber-500">
                  ค้นหาในต่างจังหวัด - ภาคตะวันตก
                </h2>
                <div className="divider"></div>
                <div
                  className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {Geo_W.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        ) : (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h2 className="text-xl mb-2 mt-6 text-amber-500">
                  ค้นหาในต่างจังหวัด - ภาคตะวันออก
                </h2>
                <div className="divider"></div>
                <div
                  className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {Geo_E.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        ) : (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h2 className="text-xl mb-2 mt-6 text-amber-500">
                  ค้นหาในต่างจังหวัด - ภาคใต้
                </h2>
                <div className="divider"></div>
                <div
                  className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                  style={{
                    width: "100%",
                    // display: "flex",
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {Geo_S.map((item, index) => {
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <p
                            className="text-black
                      hover:text-amber-500 cursor-pointer"
                          >
                            <Link
                              to={`/company/area/pronvinces/${item.ProvinceID}`}
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>{" "}
                            </Link>
                          </p>
                        ) : (
                          <Link
                            to={`/company/area/pronvinces/${item.ProvinceID}`}
                          >
                            <p
                              className="text-black
                      hover:text-amber-500 cursor-pointer"
                            >
                              <p
                                className="text-black hover:text-amber-500 cursor-pointer"
                                style={{
                                  fontSize: windowWidth < 768 ? "12px" : "16px",
                                }}
                              >
                                » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                                <span className="text-gray-300">
                                  ({item.count})
                                </span>
                              </p>
                            </p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {windowWidth < 768 ? null : (
                <div
                  className="bg-white p-4 rounded-lg shadow-md"
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    justifyContent: "center",
                    // border: "1px solid red",
                    width: windowWidth < 768 ? "100%" : "20%",
                    height: "auto",
                  }}
                >
                  <div
                    className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 "
                    style={{
                      width: "100%",
                      // display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1"
                      style={{
                        width: "100%",
                        height: windowWidth < 768 ? "130px" : "220px",

                        justifyContent: "center",
                        marginTop: windowWidth < 768 ? "0px" : "20px",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          // border: "1px solid red",
                          height: "100%",
                          // display: "flex",
                          // overflow: "auto",
                        }}
                      >
                        {data.map((item) => {
                          return (
                            <Link to={`/news/${item.article_id}`}>
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
                                    fontSize:
                                      windowWidth < 768 ? "10px" : "16px",
                                    fontWeight: "bold",
                                    // สีเหลือง
                                    color: "#E19D00",
                                  }}
                                >
                                  {item.topic.length > 30
                                    ? item.topic
                                        .substring(0, 30)
                                        .replace(/&quot;/g, "''") + "..."
                                    : item.topic}
                                </p>
                                <p
                                  style={{
                                    // textAlign: "center",
                                    marginLeft: "10px",
                                    fontSize:
                                      windowWidth < 768 ? "8px" : "12px",
                                    marginBottom: "10px",
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
                        <div
                          style={{
                            width: "100%",
                            marginTop: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Link to="/news">
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
                                width: windowWidth < 768 ? "100%" : "auto",
                                boxShadow: "0 0 5px #868686",
                                fontSize: windowWidth < 768 ? "10px" : "14px",
                              }}
                            >
                              ดูทั้งหมด
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isVisible && (
              <span
                className="fixed bottom-20 right-20 block bg-yellow-400 hover:bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 opacity-50 hover:opacity-100"
                onClick={scrollToTop}
              >
                <UpCircleOutlined style={{ fontSize: "24px" }} />
              </span>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default SearchCompanyPage;
