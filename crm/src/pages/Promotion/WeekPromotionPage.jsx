import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { Divider, Button, Space, Tag, Typography, Modal } from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import TableComponent from "../../components/TableComponent/TableComponent";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import CreateWeekPromotionModel from "../../components/PromotionComponent/WeekPromotion/CreateWeekPromotionModel";
import ChangePicWeekPromotion from "../../components/PromotionComponent/WeekPromotion/ChangePicWeekPromotion";
import UpdateStatusWeekPromotion from "../../components/PromotionComponent/WeekPromotion/UpdateStatusWeekPromotion";
import AddItemInWeekPromotion from "../../components/PromotionComponent/WeekPromotion/AddItemInWeekPromotion";
import ItemsInGroupWeekPromotion from "../../components/PromotionComponent/WeekPromotion/ItemsInGroupWeekPromotion";
import EditWeekPromotion from "../../components/PromotionComponent/WeekPromotion/EditWeekPromotion";

function WeekPromotionPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.WeekPromotion);
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
                  ApiRouter.WeekPromotionImage,
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
          const res = await API.delete(ApiRouter.WeekPromotion + id);
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
      width: "200px",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: "200px",

      render: (_, record) => (
        <>
          <ChangePicWeekPromotion img={record.img} id={record.id} />
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: "200px",
    },
    {
      title: "Limit",
      dataIndex: "limit",
      key: "limit",
      align: "center",
      width: "100px",
    },
    {
      title: "Reset limit",
      dataIndex: "reset_limit",
      key: "reset_limit",
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
      title: "Pack No",
      dataIndex: "pack_no",
      key: "pack_no",
      align: "center",
      width: "100px",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: "100px",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      width: "100px",

      render: (_, record) => (
        <>
          <UpdateStatusWeekPromotion
            status={record.status}
            group_id={record.group_id}
            id={record.id}
          />
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
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <AddItemInWeekPromotion group_id={record.group_id} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <ItemsInGroupWeekPromotion group_id={record.group_id} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <EditWeekPromotion data={record} />
          </div>
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
          <Title level={2}>Week Promotion Management</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <CreateWeekPromotionModel setIsSubmit={setIsSubmit} />
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

export default WeekPromotionPage;
