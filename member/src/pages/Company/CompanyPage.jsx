import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
function CompanyPage() {
  const company_id = localStorage.getItem("company_id");
  console.log(company_id);
  const [data, setData] = useState([]);
  const [mapStatus, setMapStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [detailStatus, setDetailStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (company_id == "no data") {
          return;
        }
        const Company = await API.get(
          ApiRouter.CompanyByCompanyId + company_id
        );
        setData(Company.data.data);
        console.log(Company.data.data);
        let chackMap = Company.data.data.longitude;
        if (chackMap == "") {
          setMapStatus(false);
        } else {
          setMapStatus(true);
        }

        let checkdetail = Company.data.data.detail;
        if (checkdetail == "") {
          setDetailStatus(false);
        } else {
          setDetailStatus(true);
        }

        const CompanyImage = await API.get(
          ApiRouter.CompanyImageComID + company_id
        );
        if (CompanyImage.data.data.length == 0) {
          setImageStatus(false);
        } else {
          setImageStatus(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const dataSource = [
    {
      key: "1",
      name: "รายละเอียดทั่วไป",
      link: "/mycompany/detail",
      text: Object.keys(data).length > 0 ? "แก้ไข" : "สร้าง",
    },
    {
      key: "2",
      name: "แผนที่",
      link: "/mycompany/map",
      disabled: company_id === "no data" ? true : false,
      text: mapStatus === true ? "แก้ไข" : "สร้าง",
    },
    {
      key: "3",
      name: "รูปภาพ",
      link: "/mycompany/image",
      disabled: company_id === "no data" ? true : false,
      text: imageStatus === true ? "แก้ไข" : "สร้าง",
    },
    {
      key: "4",
      name: "คำอธิบาย",
      link: "/mycompany/description",
      disabled: company_id === "no data" ? true : false,
      text: detailStatus === true ? "แก้ไข" : "สร้าง",
    },
  ];

  const columns = [
    {
      title: "หัวข้อ",
      dataIndex: "name",
      key: "name",
      align: "center",
    },

    {
      title: "ดูรายละเอียด",
      align: "center",
      // disabled
      render: (text, record) => (
        <Link to={record.link}>
          <Button
            type="primary"
            // onClick={() => console.log(record)}
            disabled={record.disabled}
            style={{
              backgroundColor: record.text === "สร้าง" ? "#1890ff" : "#D6A600",
              // borderColor: record.disabled ? "gray" : "#1890ff",
            }}
          >
            {record.text}
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      {" "}
      <p
        style={{
          fontSize: 36,
          fontWeight: "bold",
          marginBottom: 40,
          //center
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        กรุณาใส่รายละเอียดบริษัทของคุณ
      </p>
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{
          width: "70%",
          marginLeft: "15%",
          marginRight: "15%",
        }}
      />
    </div>
  );
}

export default CompanyPage;
