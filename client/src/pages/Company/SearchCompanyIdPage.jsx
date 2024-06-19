import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import image from "../../assets/image/banner10.png";
import topten from "../../assets/image/top-10.gif";
import Swal from "sweetalert2";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";

function SearchCompanyIdPage() {
  const { type, area } = useParams();
  console;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataTopTen, setDataTopTen] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [araeName, setAreaName] = useState("");
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

  // const [dataSelect, setDataSelect] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (type === "pronvinces") {
        const getProvince = await API.get(ApiRouter.Amphoe + area);
        setAreaName(getProvince.data.data[0].ProvinceThai);
        const res = await API.get(ApiRouter.CompanyByProvince + area);
        if (res.data.status === true) {
          // setLoading(false);
          if (res.data.data.length === 0) {
            // setLoading(false);
          } else {
            let dataArr = [];
            console.log(res.data.data);

            res.data.data.map((item) => {
              if (item.status === 1) {
                dataArr.push(item);
              }
            });
            setData(dataArr);
            // console.log(dataArr);

            const itemsWithImages = await Promise.all(
              dataArr.map(async (item) => {
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
            setData(itemsWithImages);
          }
        } else {
        }
      } else {
        const getAmphoe = await API.get(ApiRouter.Tambon + area);
        setAreaName(getAmphoe.data.data[0].AmphoeThai);
        const res = await API.get(ApiRouter.CompanyByAmphoe + area);
        if (res.data.status === true) {
          // setLoading(false);
          if (res.data.data.length === 0) {
            // setLoading(false);
          } else {
            let dataArr = [];
            console.log(res.data.data);

            res.data.data.map((item) => {
              if (item.status === 1) {
                dataArr.push(item);
              }
            });
            setData(dataArr);
            // console.log(dataArr);

            const itemsWithImages = await Promise.all(
              dataArr.map(async (item) => {
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
            setData(itemsWithImages);
          }
        } else {
        }
      }
    };
    fetchData();

    const fetchData2 = async () => {
      const res = await API.get(ApiRouter.CompanyTopTen);

      if (res.data.status === true) {
        setLoading(false);
        if (res.data.data.length === 0) {
          setLoading(false);

          setDataTopTen(res.data.data);
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

          setDataTopTen(itemsWithImages);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถดึงข้อมูลบริษัทที่น่าสนใจได้",
        });
      }
    };
    fetchData2();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let prevPageItem = windowWidth < 768 ? currentPage - 1 : currentPage - 2;
    let nextPageItem = windowWidth < 768 ? currentPage + 1 : currentPage + 2;
    for (
      let i = Math.max(prevPageItem, 1);
      i <= Math.min(nextPageItem, totalPages);
      i++
    ) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          style={{
            width: windowWidth < 786 ? "20px" : "30px",
            fontSize: windowWidth < 786 ? "10px" : "16px",
            border: "1px solid #E19D00",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "5px",
            background: i === currentPage ? "#E19D00" : "none",
            color: i === currentPage ? "white" : "#000", // เพิ่มสีข้อความในกรอบ
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div
          style={{
            width: "90%",
            margin: "auto",
            marginTop: "20px",
            // border: "1px solid red",
          }}
        >
          <div
            style={{
              width: "100%",
              // height: "1000px",
              justifyContent: "center",
              alignItems: "center",
              // border: "1px solid red",
            }}
          >
            <img
              src={image}
              style={{
                width: "100%",
              }}
            ></img>
          </div>
          <p
            style={{
              fontSize: windowWidth < 768 ? "16px" : "24px",
              fontWeight: "bold",
              color: "#E19D00",
              marginTop: "20px",
            }}
          >
            รายชื่อบริษัทรักษาความปลอดภัย พื้นที่ : {araeName}
          </p>

          <div className="divider"></div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4"
            style={{
              width: "100%",
              height: "auto",
              display: windowWidth < 768 ? null : "flex",
            }}
          >
            {data.length === 0 ? (
              <div
                style={{
                  width: windowWidth < 768 ? "100%" : "80%",
                  height: "auto",
                }}
              >
                <p>ไม่พบ รายชื่อบริษัทรักษาความปลอดภัยในพื้นที่ : {araeName}</p>
              </div>
            ) : (
              <div
                style={{
                  width: windowWidth < 768 ? "100%" : "80%",
                  height: "auto",
                }}
              >
                {currentItems.map((item) => {
                  return (
                    <Link key={item.id} to={`/company/${item.company_id}`}>
                      <div
                        key={item.id}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "flex",
                          border: "2px solid #E19D00",
                          marginTop: "10px",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        }}
                      >
                        <div
                          style={{
                            width: "30%",
                            height: "auto",
                            display: "flex",
                          }}
                        >
                          <img
                            src={item.img}
                            style={{
                              width: "100%",
                              height: "auto",
                              margin: "auto",
                            }}
                          ></img>
                        </div>

                        <div
                          style={{
                            width: "70%",
                            height: "auto",
                            marginLeft: "20px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: windowWidth < 768 ? "12px" : "24px",
                              fontWeight: "bold",
                              color: "#E19D00",
                              marginTop: windowWidth < 768 ? "5px" : "20px",
                            }}
                          >
                            {item.company_name}
                          </p>
                          <p
                            style={{
                              fontSize: windowWidth < 768 ? "10px" : "16px",
                              marginTop: windowWidth < 768 ? "5px" : "10px",
                            }}
                          >
                            {/* {item.description} */}
                            {item.description.length > 100
                              ? item.description
                                  .substring(0, 100)
                                  .replace(/&quot;/g, "''") + "..."
                              : item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <span>
                    <DoubleLeftOutlined
                      style={{
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    />
                    <button
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      style={{
                        marginRight: "20px",
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    >
                      หน้าแรก
                    </button>
                    <LeftOutlined
                      style={{
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    />
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      style={{
                        marginRight: "20px",
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    >
                      ก่อนหน้า
                    </button>
                    {renderPageNumbers()}

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      style={{
                        marginLeft: "20px",
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    >
                      ต่อไป
                    </button>
                    <RightOutlined
                      style={{
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    />
                    <button
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      style={{
                        marginLeft: "20px",
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    >
                      หน้าสุดท้าย
                    </button>
                    <DoubleRightOutlined
                      style={{
                        fontSize: windowWidth < 768 ? "10px" : "16px",
                      }}
                    />
                  </span>
                </div>
              </div>
            )}

            <div
              style={{
                width: windowWidth < 768 ? "100%" : "20%",
                height: "auto",
                //bg สีน้ำเงินเข้ม
                backgroundColor: "#182F68",
                marginLeft: windowWidth < 768 ? null : "30px",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <img src={topten}></img>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-1">
                {dataTopTen.map((item) => {
                  return (
                    <Link key={item.id} to={`/company/${item.company_id}`}>
                      <div
                        key={item.id}
                        style={{
                          width: "100%",
                          height: "250px",
                          border: "2px solid #EAD713",
                          marginTop: "10px",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        }}
                      >
                        <div
                          style={{
                            width: "auto",
                            height: "auto",
                          }}
                        >
                          <img
                            src={item.img}
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                          ></img>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "flex",
                            marginTop: windowWidth < 768 ? "15px" : "10px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: windowWidth < 768 ? "12px" : "14px",
                              fontWeight: "bold",
                              color: "#EAD713",
                              textAlign: "center",
                              margin: "auto",
                            }}
                          >
                            {item.company_name}
                          </p>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "flex",
                            marginTop: windowWidth < 768 ? "15px" : "10px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: windowWidth < 768 ? "12px" : "14px",
                              fontWeight: "bold",
                              color: "#EAD713",
                              textAlign: "center",
                              margin: "auto",
                              display: "flex",
                            }}
                          >
                            <EyeOutlined />
                            <p
                              style={{
                                marginLeft: "5px",
                              }}
                            >
                              {item.visited.toLocaleString()} views
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SearchCompanyIdPage;
