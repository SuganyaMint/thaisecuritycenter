import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Divider, Typography, Image, Tabs } from "antd";
import ImageCompanyPage from "./ImageCompanyPage";
import DescriptionCompanyPage from "./DescriptionCompanyPage";
import DetailCompanyPage from "./DetailCompanyPage";

const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";

function MainDetailCompanyPage() {
  const navigate = useNavigate();
  const { company_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dataImage, setDataImage] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.Company + "/" + company_id);
      setData(res.data.data);
      const getDataImage = await API.get(
        ApiRouter.CompanyImageComID + company_id
      );
      const dataImage = getDataImage.data.data;
      if (res.data.status === true) {
        setLoading(false);
        if (res.data.data.length === 0) {
          setLoading(false);
          setDataImage(res.data.data);
        } else {
          const itemsWithImages = await Promise.all(
            dataImage.map(async (item) => {
              // console.log(item.link);
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
          setDataImage(itemsWithImages);
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
    setIsSubmit(false);
  }, [isSubmit]);

  const [tabKey, setTabKey] = useState(1);
  const onChange = (key) => {
    setTabKey(key);
  };
  const tabName = [
    {
      id: 1,
      name: "รายละเอียด",
      link: "/company/" + company_id,
    },
    {
      id: 2,
      name: "รูปภาพ",
      link: "/company/image/" + company_id,
    },
    {
      id: 3,
      name: "คำอธิบายบนเว็บไซต์",
      link: "/company/description/" + company_id,
    },
  ];
  return (
    <>
      {loading ? (
        <>
          <SkeletonComponent />
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Title level={3} style={{ flex: "95%" }}>
              {data.company_name}
            </Title>
            <LeftCircleOutlined
              style={{
                fontSize: "30px",
                cursor: "pointer",
                flex: "5%",
                textAlign: "right",
                color: "#1890ff",
                marginTop: "-40px",
              }}
              onClick={() => navigate("/company")}
            />
          </div>

          <Tabs
            onChange={onChange}
            type="card"
            items={tabName.map((item) => {
              const id = item.id;
              const name = item.name;
              return {
                label: name,
                key: id,
                link: item.link,
              };
            })}
          />
          {/* <Divider /> */}
          <Paragraph>
            {tabKey === 1 ? (
              <DetailCompanyPage data={data} />
            ) : tabKey === 2 ? (
              <ImageCompanyPage data={data} />
            ) : (
              <DescriptionCompanyPage data={data} />
            )}
          </Paragraph>
        </>
      )}
    </>
  );
}

export default MainDetailCompanyPage;
