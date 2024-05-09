import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { Divider, Button, Space, Typography } from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";

import TableComponent from "../../components/TableComponent/TableComponent";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import AddLevelPromotion from "../../components/PromotionComponent/LevelPromotion/AddLevelPromotion";
import UpdateStatusLevelPromotion from "../../components/PromotionComponent/LevelPromotion/UpdateStatusLevelPromotion";
import EditLevelPromotion from "../../components/PromotionComponent/LevelPromotion/EditLevelPromotion";
import ChangePicLevelPromotion from "../../components/PromotionComponent/LevelPromotion/ChangePicLevelPromotion";
import AddItemInLevelPromotion from "../../components/PromotionComponent/LevelPromotion/AddItemInLevelPromotion";
import ItemsInGroupLevelPromotion from "../../components/PromotionComponent/LevelPromotion/ItemsInGroupLevelPromotion";

function LevelPromotionPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.LevelPromotion);
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
                  ApiRouter.LevelPromotionImage,
                  {
                    filename: item.image,
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
  }, [isSubmit]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "คุณแน่ใจหรือไม่ ?",
        text: "คุณต้องการลบข้อมูลนี้จริงหรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await API.delete(ApiRouter.LevelPromotion + "/" + id);
          if (res.data.status === true) {
            Swal.fire({
              title: "ลบข้อมูลสำเร็จ !",
              text: "คุณลบข้อมูลสำเร็จ",
              icon: "success",
              allowOutsideClick: false,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            setIsSubmit(true);
          } else {
            Swal.fire({
              title: "ลบข้อมูลไม่สำเร็จ !",
              text: "คุณลบข้อมูลไม่สำเร็จ",
              icon: "error",
              allowOutsideClick: false,
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "100px",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: "200px",
      render: (_, record) => (
        <>
          <ChangePicLevelPromotion img={record.img} id={record.id} />
        </>
      ),
    },
    {
      title: "Level No",
      dataIndex: "level",
      key: "level",
      align: "center",
      width: "100px",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: "100px",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      align: "center",
      width: "100px",
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "expiry",
      key: "expiry",
      align: "center",
      width: "150px",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      width: "100px",
      render: (_, record) => (
        <>
          <UpdateStatusLevelPromotion id={record.id} status={record.status} />
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: "250px",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <AddItemInLevelPromotion group_id={record.group_id} />
          <ItemsInGroupLevelPromotion group_id={record.group_id} />
          <EditLevelPromotion data={record} />
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            style={{
              width: 200,
            }}
          >
            ลบ
          </Button>
        </div>
      ),
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
          <Title level={2}>Level Promotion Management</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <AddLevelPromotion setIsSubmit={setIsSubmit} />
          </div>
          <Divider />
          <Paragraph>
            <TableComponent columns={columns} data={data} />
          </Paragraph>
        </>
      )}
    </>
  );
}
export default LevelPromotionPage;
