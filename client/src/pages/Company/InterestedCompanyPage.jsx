import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

import { Divider,  Typography, Table } from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";

function InterestedCompanyPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.ContactInterested);
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
          const res = await API.delete(ApiRouter.ContactInterested + id);
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
      title: "ชื่อบริษัท",
      key: "company",
      dataIndex: "company",
      align: "center",
      width: 300,
    },

    {
      title: "ชื่อ - นามสกุล",
      key: "name",
      dataIndex: "name",
      align: "center",
      width: 300,
    },
    {
      title: "เบอร์โทร",
      key: "phone",
      dataIndex: "phone",
      align: "center",
      width: 150,
    },

    {
      title: "EMAIL",
      key: "email",
      dataIndex: "email",
      align: "center",
      width: 280,
    },

    {
      title: "ข้อความ",
      key: "detail",
      dataIndex: "detail",
      align: "center",
      width: 500,
      render: (text, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            {record.detail.split("\r\n").map((line, index) => (
              <div key={index} style={{ textAlign: "left" }}>
                {line}
              </div>
            ))}
          </div>
        );
      },
    },

    {
      title: "IP",
      key: "ip",
      dataIndex: "ip",
      align: "center",
      width: 200,
    },
    {
      title: "วันที่ส่งข้อมูล",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      width: 200,
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
          <Title level={2}>รายละเอียดผู้ติดต่อสนใจจ้าง/สมัคร รปภ.</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            {/* <CreateTitleBar setIsSubmit={setIsSubmit} /> */}
          </div>
          <Divider />
          <Paragraph>
            <Table
              columns={columns}
              dataSource={data}
              rowKey={(record) => record.id}
              scroll={{
                x: 1300,
                y: 500,
              }}
            />
          </Paragraph>
        </>
      )}
    </>
  );
}
export default InterestedCompanyPage