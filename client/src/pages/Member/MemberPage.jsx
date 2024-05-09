import React, { useEffect, useState } from "react";
import { Typography, Divider, Table, Button, BackTop } from "antd";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import ChangeTypeMember from "../../components/MemberComponent/ChangeTypeMember";
import Swal from "sweetalert2";
const { Title, Paragraph } = Typography;

function MemberPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.Member);

      if (res.data.status === true) {
        setLoading(false);
        setData(res.data.data);
      }
    };

    fetchData();
    setIsSubmit(false);
  }, [isSubmit]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "คุณแน่ใจใช่ไหมที่จะลบสมาชิก?",
      text: "คุณจะไม่สามารถกู้คืนข้อมูลได้อีก!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.delete(`${ApiRouter.Member}/${id}`);

        if (res.data.status === true) {
          Swal.fire("ลบสำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว.", "success");
          setIsSubmit(true);
        }
      }
    });
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "นาสกุล",
      dataIndex: "surname",
      key: "surname",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "ip",
      dataIndex: "ip",
      key: "ip",
      align: "center",
    },
    {
      title: "วันที่สมัครสมาชิก",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "ชนิดสมาชิก",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (text, record) => (
        <>
          <ChangeTypeMember data={record} />
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <>
          <Button
            danger
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
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
          <Title level={2}>รายละเอียดสมาชิก</Title>
          {/* <ChangeTypeMember setIsSubmit={setIsSubmit} /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          ></div>
          <Divider />
          <Paragraph>
            <Table
              dataSource={data}
              columns={columns}
              rowKey={(record) => record.id}
            />
          </Paragraph>
        </>
      )}
    </>
  );
}

export default MemberPage;
