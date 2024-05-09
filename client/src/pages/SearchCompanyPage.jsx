import React, { useState, useEffect } from "react";
import GuideComponent from "../components/GuideComponent/GuideComponent";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import { UpCircleOutlined } from "@ant-design/icons";

function SearchCompanyPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [Geo_N, setGeo_N] = useState([]); //ภาคเหนือ
  const [Geo_NE, setGeo_NE] = useState([]); //ภาคตะวันออกเฉียงเหนือ
  const [Geo_E, setGeo_E] = useState([]); //ภาคตะวันออก
  const [Geo_S, setGeo_S] = useState([]); //ภาคใต้
  const [Geo_W, setGeo_W] = useState([]); //ภาคตะวันตก
  const [Geo_C, setGeo_C] = useState([]); //ภาคกลาง
  const [Geo_BKK, setGeo_BKK] = useState([]); //กรุงเทพมหานคร
  const [nearBKK, setNearBKK] = useState([]); // ใกล้กรุงเทพมหานคร

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
      const near_bkk = await API.get(ApiRouter.NearBKK);
      setNearBKK(near_bkk.data.data);
      const bkk = await API.get(ApiRouter.AmphoeInBKK);
      setGeo_BKK(bkk.data.data);

      Geo.map(async (item) => {
        const data = await API.get(ApiRouter.Geo + item.id);
        if (item.id === 1) {
          setGeo_N(data.data.data);
        } else if (item.id === 2) {
          setGeo_C(data.data.data);
        } else if (item.id === 3) {
          setGeo_NE(data.data.data);
        } else if (item.id === 4) {
          setGeo_W(data.data.data);
        } else if (item.id === 5) {
          setGeo_E(data.data.data);
        } else if (item.id === 6) {
          setGeo_S(data.data.data);
        }
      });
    };
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
      <div id="topview"></div>
      <GuideComponent numImages={4} />
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
            border: "1px solid blue",
          }}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-md"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              justifyContent: "center",
              border: "1px solid red",

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
                  const nearBkkElement = document.getElementById("nearBkk_id");
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
              {Geo_BKK.map((item, index) => {
                return (
                  <div key={index}>
                    {index % 2 === 0 ? (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย เขต {item.AmphoeThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย เขต {item.AmphoeThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
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
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
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
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
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
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
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
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
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
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
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
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
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
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    ) : (
                      <p
                        className="text-black
                      hover:text-amber-500 cursor-pointer"
                      >
                        <p className="text-black hover:text-amber-500 cursor-pointer">
                          » บริษัทรักษาความปลอดภัย {item.ProvinceThai}{" "}
                          <span className="text-gray-300">({item.count})</span>
                        </p>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="bg-white p-4 rounded-lg shadow-md"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              justifyContent: "center",
              border: "1px solid red",
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
                style={{
                  width: "100%",
                  height: "200px",
                  border: "1px solid black",
                }}
              >
                blog 2 1
              </div>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  border: "1px solid black",
                }}
              >
                blog 2 2
              </div>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  border: "1px solid black",
                }}
              >
                blog 2 1
              </div>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  border: "1px solid black",
                }}
              >
                blog 2 2
              </div>
            </div>
          </div>
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
  );
}

export default SearchCompanyPage;
