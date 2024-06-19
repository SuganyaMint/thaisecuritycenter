import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { Button, Select, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LeftCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import Swal from "sweetalert2";

function DetailCompanyPage() {
  const navigate = useNavigate();
  const company_id = localStorage.getItem("company_id");
  const member_id = localStorage.getItem("member_id");
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [province, setProvince] = useState(data.province);
  const [amphoe, setAmphoe] = useState(data.amphoe);
  const [district, setDistrict] = useState(data.district);
  const [zipcode, setZipcode] = useState(data.zipcode);
  const [provinceOption, setProvinceOption] = useState([]);
  const [amphoeOption, setAmphoeOption] = useState([]);
  const [districtOption, setDistrictOption] = useState([]);
  const [ip, setIp] = useState([]);
  const [oldAddress, setOldAddress] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Pronvinces = await API.get(ApiRouter.Pronvinces);
        setProvinceOption(Pronvinces.data.data);
        const getIP = await fetch("https://api.ipify.org?format=json");
        const ip = await getIP.json();
        setIp(ip.ip);

        if (company_id =="no data") {
          setIsloading(false);
          return;
        }

        const getAmphoe = await API.get(ApiRouter.Amphoe + data.province);
        const getDistrict = await API.get(ApiRouter.Tambon + data.amphoe);

        const getCompany = await API.get(
          ApiRouter.CompanyByCompanyId + company_id
        );
        setData(getCompany.data.data);

        let dataCompany = getCompany.data.data;
        const detailAdd = await API.get(
          ApiRouter.getDetailAddress + dataCompany.district
        );
        setOldAddress(detailAdd.data.data);
        setIsloading(false);
        // if (
        //   Pronvinces &&
        //   getCompany &&
        //   getIP &&
        //   getAmphoe &&
        //   getDistrict &&
        //   detailAdd
        // ) {
        //   // setAmphoeOption(getAmphoe.data.data);
        //   // setDistrictOption(getDistrict.data.data);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    // Check and fetch data every 2 seconds until condition is met
    const intervalId = setInterval(() => {
      if (
        // amphoeOption.length === 0 ||
        // districtOption.length === 0 ||
        Object.keys(oldAddress).length === 0
      ) {
        fetchData();
      } else {
        clearInterval(intervalId); // Clear interval when condition is met
      }
    }, 1000);

    // Initial fetch
    fetchData();

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [
    amphoeOption.length,
    districtOption.length,
    data.province,
    data.amphoe,
    company_id,
  ]);

  const onFinish = async (values) => {
    if (Object.keys(data).length > 0) {
      //Edit
      let dataSend = {
        member_id: member_id,
        company_name: values.company_name
          ? values.company_name
          : data.company_name,
        keyword: values.keyword ? values.keyword : data.keyword,
        address: values.address ? values.address : data.address,
        province: province ? province : data.province,
        amphoe: amphoe ? amphoe : data.amphoe,
        district: district ? district : data.district,
        zipcode: values.zipcode ? values.zipcode : data.zipcode,
        phone: values.phone ? values.phone : data.phone,
        mobile: values.mobile ? values.mobile : data.mobile,
        fax: values.fax ? values.fax : data.fax,
        email: values.email ? values.email : data.email,
        website: values.website ? values.website : data.website,
        facebook: values.facebook ? values.facebook : data.facebook,
        line: values.line ? values.line : data.line,
        twitter: values.twitter ? values.twitter : data.twitter,
        instagram: values.instagram ? values.instagram : data.instagram,
        tiktok: values.tiktok ? values.tiktok : data.tiktok,
        youtube: values.youtube ? values.youtube : data.youtube,
        ip: ip,
      };

      Swal.fire({
        icon: "question",
        title: "คุณต้องการแก้ไขรายละเอียดบริษัทใช่ไหม?",
        showDenyButton: true,
        confirmButtonText: "ใช่",
        denyButtonText: `ไม่ใช่`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await API.put(
            ApiRouter.CompanyUpdateDetail + company_id,
            dataSend
          );
          if (res.data.status === true) {
            Swal.fire("Saved!", "", "success");
            //set time out 1 sec
            setTimeout(() => {
              navigate("/mycompany");
            }, 1000);
          } else {
            Swal.fire("Error!", "", "error");
          }
        } else if (result.isDenied) {
          Swal.fire("ไม่สามารถแก้ไขข้อมูลได้", "", "info");
        }
      });
    } else {
      //Create
      let dataSend = {
        member_id: member_id,
        company_name: values.company_name,
        keyword: values.keyword,
        address: values.address,
        province: province,
        amphoe: amphoe,
        district: district,
        zipcode: values.zipcode,
        phone: values.phone,
        mobile: values.mobile,
        fax: values.fax,
        email: values.email,
        website: values.website,
        facebook: values.facebook,
        line: values.line,
        twitter: values.twitter,
        instagram: values.instagram,
        tiktok: values.tiktok,
        youtube: values.youtube,
        ip: ip,
      };

      Swal.fire({
        icon: "question",
        title: "คุณต้องการเพิ่มรายละเอียดบริษัทใช่ไหม?",
        showDenyButton: true,
        confirmButtonText: "ใช่",
        denyButtonText: `ไม่ใช่`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await API.post(ApiRouter.Company, dataSend);
          if (res.data.status === true) {
            Swal.fire("Saved!", "", "success");
            //set time out 1 sec
            setTimeout(() => {
              navigate("/mycompany");
            }, 1000);
          } else {
            Swal.fire("Error!", "", "error");
          }
        } else if (result.isDenied) {
          Swal.fire("ไม่สามารถเพิ่มข้อมูลได้", "", "info");
        }
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {isloading ? (
        <>
          {" "}
          <SkeletonComponent />
        </>
      ) : (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <LeftCircleOutlined
              style={{
                fontSize: 20,
                marginRight: 10,
                cursor: "pointer",
                color: "#1890ff",
              }}
              onClick={() => navigate("/mycompany")}
            />
            <p
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 0,
                flex: 1,
                textAlign: "center",
              }}
            >
              กรุณากรอกรายละเอียดบริษัทของคุณ
            </p>
          </div>
          <div
            style={{
              //center
              display: "flex",

              width: "100%",
              // border: "1px solid #ccc",
            }}
          >
            <Form
              name="basic"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                width: "70%",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="ชื่อบริษัท" name="company_name">
                <Input.TextArea
                  defaultValue={data.company_name}
                  style={{ width: "100%" }}
                  rows={3}
                />
              </Form.Item>

              <Form.Item label="Keyword" name="keyword">
                <Input.TextArea
                  rows={4}
                  defaultValue={data.keyword}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="ที่อยู่" name="address">
                <Input defaultValue={data.address} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="จังหวัด" name="province">
                {/* <p style={{
                  color: "green",
                }}>{oldAddress.ProvinceThai}</p> */}
                <Select
                  placeholder={oldAddress.ProvinceThai}
                  style={{ width: "100%" }}
                  onChange={async (value) => {
                    try {
                      setProvince(value);
                      const Amphoe = await API.get(ApiRouter.Amphoe + value);
                      setAmphoeOption(Amphoe.data.data);
                      setAmphoe("");
                      setDistrictOption([]);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  {provinceOption.map((item, index) => (
                    <Select.Option key={index} value={item.ProvinceID}>
                      {item.ProvinceThai}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="อำเภอ/เขต" name="amphoe">
                {/* <Input defaultValue={data.amphoe} style={{ width: "100%" }} /> */}
                <Select
                  placeholder={oldAddress.AmphoeThai}
                  style={{ width: "100%" }}
                  onChange={async (value) => {
                    try {
                      setAmphoe(value);
                      const Tambon = await API.get(ApiRouter.Tambon + value);
                      setDistrictOption(Tambon.data.data);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  {amphoeOption.map((item, index) => (
                    <Select.Option key={index} value={item.AmphoeID}>
                      {item.AmphoeThai}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="ตำบล/แขวง" name="district">
                {/* <Input defaultValue={data.district} style={{ width: "100%" }} /> */}
                <Select
                  // defaultValue={data.district}
                  placeholder={oldAddress.TambonThai}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setDistrict(value);
                    const Tambon = districtOption.find(
                      (item) => item.TambonID === value
                    );
                    if (Tambon) {
                      setZipcode(Tambon.PostCodeMain);
                    }
                  }}
                >
                  {districtOption.map((item, index) => (
                    <Select.Option key={index} value={item.TambonID}>
                      {item.TambonThai}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="รหัสไปรณีย์" name="zipcode">
                <Input
                  placeholder={oldAddress.PostCodeMain}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="โทรติดต่อ" name="phone">
                <Input defaultValue={data.phone} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="มือถือ" name="mobile">
                <Input defaultValue={data.mobile} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="FAX" name="fax">
                <Input defaultValue={data.fax} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input defaultValue={data.email} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input defaultValue={data.website} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Facebook" name="facebook">
                <Input defaultValue={data.facebook} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Line" name="line">
                <Input defaultValue={data.line} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Twitter" name="twitter">
                <Input defaultValue={data.twitter} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Instagram" name="instagram">
                <Input
                  defaultValue={data.instagram}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Tiktok" name="tiktok">
                <Input defaultValue={data.tiktok} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Youtube" name="youtube">
                <Input defaultValue={data.youtube} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 15,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  {Object.keys(data).length > 0 ? "แก้ไข" : "บันทึก"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}
export default DetailCompanyPage;
