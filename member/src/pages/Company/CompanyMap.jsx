import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { Button, Select, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { LeftCircleOutlined, EditOutlined, SaveOutlined , EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CompanyMap() {
  const navigate = useNavigate();
  const company_id = localStorage.getItem("company_id");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [oldLat, setOldLat] = useState();
  const [oldLon, setOldLon] = useState();
  const zoom = 15;

  useEffect(() => {
    const fetchData = async () => {
      const getCompany = await API.get(
        ApiRouter.CompanyByCompanyId + company_id
      );
      let longitudeData = getCompany.data.data.longitude;
      // console.log(longitudeData);
      // if (longitudeData == "") {
      navigator.geolocation.getCurrentPosition((postion) => {
        setLat(postion.coords.latitude);
        setLon(postion.coords.longitude);
      });
      // } else {
      setLat(getCompany.data.data.laditude);
      setLon(getCompany.data.data.longitude);

      setOldLat(getCompany.data.data.laditude);
      setOldLon(getCompany.data.data.longitude);
      // }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const getCompany = await API.get(ApiRouter.CompanyByCompanyId + company_id);
    // let longitudeData = getCompany.data.data.longitude;

    // setLat(getCompany.data.data.laditude);
    // setLon(getCompany.data.data.longitude);
    navigator.geolocation.getCurrentPosition((postion) => {
      // setLat(getCompany.data.data.laditude);
      // setLon(getCompany.data.data.longitude);

      setOldLat(getCompany.data.data.laditude);
      setOldLon(getCompany.data.data.longitude);
    });
    const ifameData = document.getElementById("iframeId");
    ifameData.src = `https://maps.google.com/maps?q=${oldLat},${oldLon}&hl=es&z=${zoom}&output=embed`;

    setOldLat(getCompany.data.data.laditude);
    setOldLon(getCompany.data.data.longitude);

    setTitle("Location ที่คุณบันทึกล่าสุด");
  };

  const reloadLocation = () => {
    navigator.geolocation.getCurrentPosition((postion) => {
      setLat(postion.coords.latitude);
      setLon(postion.coords.longitude);
    });
    const ifameData = document.getElementById("iframeId");
    ifameData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=${zoom}&output=embed`;
    setTitle("Location ที่คุณปัจจุบัน");
  };

  const [newLat, setNewLat] = useState();
  const [newLon, setNewLon] = useState();

  const onChangeLat = (e) => {
    setNewLat(parseFloat(e.target.value));
  };
  const onChangeLon = (e) => {
    setNewLon(parseFloat(e.target.value));
  };

  const updateLocation = () => {
    if (newLat === undefined || newLon === undefined) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณากรอกข้อมูล Laditude และ Longitude ให้ครบถ้วน",
      });

      return;
    }

    const ifameData = document.getElementById("iframeId");
    ifameData.src = `https://maps.google.com/maps?q=${newLat},${newLon}&hl=es;&output=embed`;
    setTitle("Location ที่คุณกำหนด");
  };

  const onFinish = async () => {
    let data = {
      laditude: newLat === undefined ? lat : newLat,
      longitude: newLon === undefined ? lon : newLon,
    };

    Swal.fire({
      icon: "question",
      title: "คุณต้องการ Update Location ใช่ไหม?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่ใช่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.put(
          ApiRouter.CompanyUpdateMap + company_id,
          data
        );
        if (res.data.status === true) {
          Swal.fire("Saved!", "", "success");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Swal.fire("Error!", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("ไม่สามารถ Update Location ได้", "", "info");
      }
    });
  };
  const [title, setTitle] = useState("Location ที่คุณบันทึกล่าสุด");
  // console.log(title);
  return (
    <div>
      {/* <p
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 40,
          //center
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Update แผนที่ บริษัทของคุณ
      </p> */}

      <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <LeftCircleOutlined
                style={{
                  fontSize: 20,
                  marginRight: 10,
                  cursor: "pointer",
                  color: "#1890ff",
                }}
                onClick={() => navigate("/mycompany")}
              />
              <p
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  marginBottom: 0,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                   Update แผนที่ บริษัทของคุณ

              </p>
            </div>
          </div>

      <div
        style={{
          height: 500,
          width: "100%",
          marginBottom: 20,
          display: "flex",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <p
            style={{
              fontSize: 16,
              // fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {title}
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              id="iframeId"
              height="500px"
              width="100%"
              frameBorder="0"
              zoom="20"
              src={
                oldLat === ""
                  ? `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=${zoom}&output=embed`
                  : `https://maps.google.com/maps?q=${oldLat},${oldLon}&hl=es&z=${zoom}&output=embed`
              }
            ></iframe>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            marginLeft: 40,
            padding: 20,
            display: "flex",
          }}
        >
          <div style={{ width: "100%" }}>
            <p
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Location ที่คุณบันทึกล่าสุด :
            </p>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100px",
                marginBottom: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "60%",
                  height: "100px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Laditude : {oldLat}
                  </p>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Longitude : {oldLon}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",

                  width: "40%",
                  height: "100px",
                }}
              >
                <Button
                  type="primary"
                  icon={<EnvironmentOutlined />}
                  onClick={fetchData}
                  style={{
                    height: "50px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    cursor: "pointer",
                    transition: "background-color 0.3s, color 0.3s",
                    backgroundColor: "#6C6C6C",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C4C4C4"; // เปลี่ยนสีปุ่มเป็นสีฟ้าเมื่อ hover
                    e.currentTarget.style.color = "#FFFFFF"; // เปลี่ยนสีข้อความเป็นสีขาวเมื่อ hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#6C6C6C"; // กลับไปเป็นสีพื้นหลังเดิมเมื่อไม่ hover
                    e.currentTarget.style.color = "#FFFFFF"; // กลับไปเป็นสีข้อความเดิมเมื่อไม่ hover
                  }}
                >
                  แสดงแผนที่
                </Button>
              </div>
            </div>

            <p
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Location ปัจุบันของคุณ :{" "}
            </p>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100px",
                marginBottom: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "60%",
                  height: "100px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Laditude : {lat}
                  </p>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Longitude : {lon}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",

                  width: "40%",
                  height: "100px",
                }}
              >
                <Button
                  type="primary"
                  icon={<EnvironmentOutlined />}
                  onClick={reloadLocation}
                  style={{
                    height: "50px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    cursor: "pointer",
                    transition: "background-color 0.3s, color 0.3s",
                    backgroundColor: "#6C6C6C",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C4C4C4"; // เปลี่ยนสีปุ่มเป็นสีฟ้าเมื่อ hover
                    e.currentTarget.style.color = "#FFFFFF"; // เปลี่ยนสีข้อความเป็นสีขาวเมื่อ hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#6C6C6C"; // กลับไปเป็นสีพื้นหลังเดิมเมื่อไม่ hover
                    e.currentTarget.style.color = "#FFFFFF"; // กลับไปเป็นสีข้อความเดิมเมื่อไม่ hover
                  }}
                >
                  แสดงแผนที่
                </Button>
              </div>
            </div>
            <p
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              กำหนด Location :
            </p>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "60%",
                  height: "100px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        // marginBottom: 20,
                        marginRight: 30,
                      }}
                    >
                      Laditude
                    </p>
                    <Input
                      style={{
                        marginBottom: 20,
                      }}
                      onChange={(e) => {
                        onChangeLat(e);
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        // marginBottom: 20,
                        marginRight: 20,
                      }}
                    >
                      Longitude
                    </p>
                    <Input
                      onChange={(e) => {
                        onChangeLon(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",

                  width: "40%",
                  height: "100px",
                }}
              >
                {/* <EnvironmentOutlined /> */}
                <Button
                  type="primary"
                  icon={<EnvironmentOutlined />}
                  onClick={updateLocation}
                  style={{
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    cursor: "pointer",
                    transition: "color 0.3s", // เพิ่มการเปลี่ยนแปลงแบบนุ่มนวล
                    //shadow
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    backgroundColor: "#6C6C6C",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C4C4C4"; // เปลี่ยนสีปุ่มเป็นสีฟ้าเมื่อ hover
                    e.currentTarget.style.color = "#FFFFFF"; // เปลี่ยนสีข้อความเป็นสีขาวเมื่อ hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#6C6C6C"; // กลับไปเป็นสีพื้นหลังเดิมเมื่อไม่ hover
                    e.currentTarget.style.color = "#FFFFFF"; // กลับไปเป็นสีข้อความเดิมเมื่อไม่ hover
                  }}
                >
                  แสดงแผนที่
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {" "}
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={onFinish}
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  cursor: "pointer",
                  transition: "color 0.3s", // เพิ่มการเปลี่ยนแปลงแบบนุ่มนวล
                  //shadow
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#005E98"; // เปลี่ยนสีปุ่มเป็นสีฟ้าเมื่อ hover
                  e.currentTarget.style.color = "#FFFFFF"; // เปลี่ยนสีข้อความเป็นสีขาวเมื่อ hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0077BF"; // กลับไปเป็นสีพื้นหลังเดิมเมื่อไม่ hover
                  e.currentTarget.style.color = "#FFFFFF"; // กลับไปเป็นสีข้อความเดิมเมื่อไม่ hover
                }}
              >
                Save Location
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMap;
