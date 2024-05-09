import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
const { TabPane } = Tabs;
import { useNavigate } from "react-router-dom";
const { items } = Tabs;
import { LeftCircleOutlined } from "@ant-design/icons";
import { Divider, Typography, Image, Tabs } from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
function ImageCompanyPage() {
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

  return (
    <>
      {loading ? (
        <>
          <SkeletonComponent />
        </>
      ) : (
        <>
          <Paragraph>
            {dataImage.map(
              (item, index) =>
                item.img && ( // เพิ่มเงื่อนไขตรวจสอบว่า item.img ไม่ใช่ null หรือ undefined
                  <Image
                    key={index} // ใช้ index เป็น key เพื่อระบุค่าที่ไม่ซ้ำกัน
                    width={250}
                    src={item.img}
                    style={{
                      padding: "10px",
                    }}
                  />
                )
            )}
          </Paragraph>
        </>
      )}
    </>
  );
}
export default ImageCompanyPage;
