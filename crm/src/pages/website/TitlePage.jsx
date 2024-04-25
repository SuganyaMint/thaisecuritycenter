import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

import { Divider, Button, Space, Tag, Typography, Image } from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import TableComponent from "../../components/TableComponent/TableComponent";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import EditTitleModel from "../../components/ModelComponent/EditTitleModel";
import CreateCreateModel from "../../components/ModelComponent/CreateTitleModel";

function TitlePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.Title);
      if (res.data.status === true) {
        setLoading(false);
        setData(res.data.data);
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
          const res = await API.delete(ApiRouter.Title + id);
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
      key: "title",
      dataIndex: "title",
      align: "center",
    },

    {
      title: "Sub Title",
      key: "subTitle",
      dataIndex: "subTitle",
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",

      render: (_, record) => (
        <>
          {record.status === 1 ? (
            <Tag color="green">ใช้งาน</Tag>
          ) : (
            <Tag color="red">ไม่ใช้งาน</Tag>
          )}
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditTitleModel data={record} />
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
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
          <Title level={2}>Title Management</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <CreateCreateModel setIsSubmit={setIsSubmit} />
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

export default TitlePage;
