import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

import { Divider, Button, Space, Table, Typography ,Image ,Tag} from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import {
  SketchCircleFilled,
  SyncOutlined,
  StarFilled,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

function ArticlePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.Article);
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
    setIsSubmit(false);
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
          const res = await API.delete(ApiRouter.Article + id);
          if (res.data.status === true) {
            Swal.fire({
              title: "ลบข้อมูลสำเร็จ !",
              text: "คุณลบข้อมูลสำเร็จ",
              icon: "success",
              allowOutsideClick: false,
            });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
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

  const handleChangeStatus = async (id, status) => {
    try {
      // console.log(status);
      const res = await API.put(ApiRouter.ChangeStatusCompany + id, {
        status: status,
      });
      if (res.data.status === true) {
        // ทำการอัปเดตค่าใน state data
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return { ...item, status: status };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "topic",
      dataIndex: "topic",
      key: "topic",
      align: "center",
    },
    {
      title: "visited",
      dataIndex: "visited",
      key: "visited",
      align: "center",
      render: (_, { visited }) => (
        <>
          <Tag
            icon={<SyncOutlined spin />}
            color="#108ee9"
            style={{
              width: "100px",
              textAlign: "center",
            }}
          >
            {visited.toLocaleString()}
          </Tag>
        </>
      ),
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (_, record) => (
       <Image src = {record.img}
       style={{

        width: "100px",
        height: "auto",
        objectFit: "cover",
       }}
       ></Image>
      ),
    },
    {
      title: "published",
      key: "published",
      dataIndex: "published",
      align: "center",
      render: (_, record) => (
        <>
          {record.published === 1 ? (
            <EyeOutlined
              style={{
                color: "#0C77FF",
                cursor: "pointer",
                fontSize: "30px",

              }}
              onClick={() => handleChangeStatus(record.published, 0)} // ส่ง record.id และ 0 เพื่อแสดงว่าเปลี่ยนเป็นสถานะเปิด
            />
          ) : (
            <EyeInvisibleOutlined
              style={{
                color: "gray",
                cursor: "pointer",
                fontSize: "30px",

              }}
              onClick={() => handleChangeStatus(record.published, 1)} // ส่ง record.id และ 1 เพื่อแสดงว่าเปลี่ยนเป็นสถานะปิด
            />
          )}
        </>
      ),
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   align: "center",

    //   render: (_, record) => (
    //     <>
    //       <UpdateStatusNewsModal data={record}  />
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {/* <EditNewsModel
            id={record.id}
            description={record.description}
            setIsSubmit={setIsSubmit}
            title={record.title}
            subtitle={record.subtitle}
          />
          <ViewNewsModel id={record.description} /> */}
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
          <Title level={2}>รายละเอียดบทความ</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            {/* <CreateNewsModel setIsSubmit={setIsSubmit} data = {data}/> */}
          </div>
          <Divider />
          <Paragraph>
            <Table columns={columns} dataSource={data} scroll={{
              x:1500
            }} />
          </Paragraph>
        </>
      )}
    </>
  );
}

export default ArticlePage;
