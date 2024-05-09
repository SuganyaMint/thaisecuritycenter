import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import {
  SketchCircleFilled,
  SyncOutlined,
  StarFilled,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Divider, Button, Space, Tag, Typography, Table, Image } from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
function CompanyPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.CompanyLogo);
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
  const handleChangeStar = async (id, star) => {
    try {
      // console.log(status);
      const res = await API.put(ApiRouter.ChangeStartCompany + id, {
        star: star,
      });
      if (res.data.status === true) {
        // ทำการอัปเดตค่าใน state data
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return { ...item, star: star };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeHire = async (id, hire) => {
    try {
      // console.log(status);
      const res = await API.put(ApiRouter.ChangeHireCompany + id, {
        hire: hire,
      });
      if (res.data.status === true) {
        // ทำการอัปเดตค่าใน state data
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return { ...item, hire: hire };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          const res = await API.delete(ApiRouter.Banner + id);
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

  const columns = [
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   align: "center",

    //   render: (_, { status }) => (
    //     <>
    //       {status === 1 ? (
    //         <Tag color="green">ใช้งาน</Tag>
    //       ) : (
    //         <Tag color="red">ไม่ใช้งาน</Tag>
    //       )}
    //     </>
    //   ),
    // },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   align: "center",

    //   render: (_, record) => <>{/* <ChangeStatusModel data={record} /> */}</>,
    // },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "80px",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: "200px",
      render: (_, record) => (
        <Image
          width={100}
          src={record.img}
          style={{
            padding: "10px",
          }}
        />
      ),
    },
    {
      title: "company_name",
      dataIndex: "company_name",
      key: "company_name",
      align: "center",
      width: "300px",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: "150px",
    },
    {
      title: "mobile",
      dataIndex: "mobile",
      key: "mobile",
      align: "center",
      width: "150px",
    },
    {
      title: "visited",
      dataIndex: "visited",
      key: "visited",
      align: "center",
      width: "100px",
      render: (_, { visited }) => (
        <>
          <Tag
            icon={<SyncOutlined spin />}
            color="#108ee9"
            style={{
              width: "60px",
              textAlign: "center",
            }}
          >
            {visited.toLocaleString()}
          </Tag>
        </>
      ),
    },
    {
      title: "star",
      dataIndex: "star",
      key: "star",
      align: "center",
      width: "100px",
      render: (_, record) => (
        <>
          {record.star === 1 ? (
            <StarFilled
              style={{
                color: "#EEB80F",
                cursor: "pointer",
                fontSize: "30px",

              }}
              onClick={() => handleChangeStar(record.id, 0)} // ส่ง record.id และ 0 เพื่อแสดงว่าเปลี่ยนเป็นสถานะเปิด
            />
          ) : (
            <StarFilled
              style={{
                color: "gray",
                cursor: "pointer",
                fontSize: "30px",

              }}
              onClick={() => handleChangeStar(record.id, 1)} // ส่ง record.id และ 0 เพื่อแสดงว่าเปลี่ยนเป็นสถานะเปิด
            />
          )}
        </>
      ),
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "100px",
      render: (_, record) => (
        <>
          {record.status === 1 ? (
            <EyeOutlined
              style={{
                color: "#0C77FF",
                cursor: "pointer",
                fontSize: "30px",

              }}
              onClick={() => handleChangeStatus(record.id, 0)} // ส่ง record.id และ 0 เพื่อแสดงว่าเปลี่ยนเป็นสถานะเปิด
            />
          ) : (
            <EyeInvisibleOutlined
              style={{
                color: "gray",
                cursor: "pointer",
                fontSize: "30px",

              }}
              onClick={() => handleChangeStatus(record.id, 1)} // ส่ง record.id และ 1 เพื่อแสดงว่าเปลี่ยนเป็นสถานะปิด
            />
          )}
        </>
      ),
    },
    {
      title: "type customer",
      dataIndex: "hire",
      key: "hire",
      align: "center",
      width: "100px",
      render: (_, record) => (
        <>
          {record.hire === 1 ? (
            <SketchCircleFilled
              style={{
                color: "#EEB80F",
                cursor: "pointer",
                fontSize: "30px",

              }}
              onClick={() => handleChangeHire(record.id, 0)} // ส่ง record.id และ 0 เพื่อแสดงว่าเปลี่ยนเป็นสถานะเปิด
            />
          ) : (
            <SketchCircleFilled
              style={{
                color: "gray",
                cursor: "pointer",
                fontSize: "30px",
              }}
              onClick={() => handleChangeHire(record.id, 1)} // ส่ง record.id และ 1 เพื่อแสดงว่าเปลี่ยนเป็นสถานะปิด
            />
          )}
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: "200px",

      render: (_, record) => (
        <Space size="middle">
          <Link to={`/company/${record.company_id}`}>
            <Button type="primary">ดูเพิ่มเติม</Button>
          </Link>

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
          <Title level={2}>รายละเอียดข้อมูลบริษัท</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            {/* <CreateBannerModel setIsSubmit={setIsSubmit} /> */}
          </div>
          <Divider />
          <Paragraph>
            <Table
              columns={columns}
              dataSource={data}
              rowKey={(record) => record.id}
              scroll={{ x: 1500, y: 500 }}
            />
          </Paragraph>
        </>
      )}
    </>
  );
}

export default CompanyPage;
