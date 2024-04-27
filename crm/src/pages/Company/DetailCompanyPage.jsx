import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  Statistic,
  Col,
  Row,
  Select
} from "antd";
import {
  SketchCircleFilled,
  EyeFilled,
  EyeInvisibleFilled,
  StarFilled,
} from "@ant-design/icons";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
function DetailCompanyPage(props) {
  const { company_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const [amphoe, setAmphoe] = useState([]);
  const [district, setDistrict] = useState([]);
  
  const data = props.data;
  const [dataNew, setData] = useState([data]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChangeStatus = async (id, status) => {
    try {
      // console.log(status);
      const res = await API.put(ApiRouter.ChangeStatusCompany + id, {
        status: status,
      });
      if (res.data.status === true) {
        // ทำการอัปเดตค่าใน state data
        const updatedData = dataNew.map((item) => {
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
        const updatedData = dataNew.map((item) => {
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
      const res = await API.put(ApiRouter.ChangeHireCompany + id, {
        hire: hire,
      });
      if (res.data.status === true) {
        // ทำการอัปเดตค่าใน state data
        const updatedData = dataNew.map((item) => {
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
  return (
    <div>
      <Paragraph>
        <Row>
          <Col flex="10px">
            <Card
              bordered={true}
              style={{
                width: 200,
                marginBottom: 20,
                textAlign: "center",
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
              }}
            >
              <Statistic
                title="Visited"
                value={data.visited}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
            <Card
              bordered={true}
              style={{
                width: 200,
                marginBottom: 20,
                textAlign: "center",
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
              }}
            >
              {dataNew[0].hire === 1 ? (
                <>
                  <p>Type Customer</p>
                  <Button
                    icon={<SketchCircleFilled />}
                    style={{
                      //ไม่เอาขอบ
                      border: "none",
                      color: "#FFBD0C",
                      cursor: "pointer",
                      fontSize: "24px",
                      height: "auto",
                    }}
                    onClick={() => handleChangeHire(data.id, 0)}
                  >
                    Premium
                  </Button>
                </>
              ) : (
                <>
                  <p>Type Customer</p>
                  <Button
                    icon={<EyeInvisibleFilled />}
                    style={{
                      //ไม่เอาขอบ
                      border: "none",
                      color: "#444444",
                      cursor: "pointer",
                      fontSize: "24px",
                      height: "auto",
                    }}
                    onClick={() => handleChangeHire(data.id, 1)}
                  >
                    Free
                  </Button>
                </>
              )}
            </Card>
            <Card
              bordered={true}
              style={{
                width: 200,
                marginBottom: 20,
                textAlign: "center",
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
              }}
            >
              {dataNew[0].status === 1 ? (
                <>
                  <p>สถานะการเผยแพร่</p>
                  <Button
                    icon={<EyeFilled />}
                    style={{
                      //ไม่เอาขอบ
                      border: "none",
                      color: "#3f8600",
                      cursor: "pointer",
                      fontSize: "24px",
                      height: "auto",
                    }}
                    onClick={() => handleChangeStatus(data.id, 0)}
                  >
                    เผยแพร่
                  </Button>
                </>
              ) : (
                <>
                  <p>สถานะการเผยแพร่</p>
                  <Button
                    icon={<EyeInvisibleFilled />}
                    style={{
                      //ไม่เอาขอบ
                      border: "none",
                      color: "#444444",
                      cursor: "pointer",
                      fontSize: "24px",
                      height: "auto",
                    }}
                    onClick={() => handleChangeStatus(data.id, 1)}
                  >
                    ไม่เผยแพร่
                  </Button>
                </>
              )}
            </Card>
            <Card
              bordered={true}
              style={{
                width: 200,
                marginBottom: 20,
                textAlign: "center",
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
              }}
            >
              {dataNew[0].star === 1 ? (
                <>
                  <p>ติดดาว</p>
                  <Button
                    icon={<StarFilled />}
                    style={{
                      //ไม่เอาขอบ
                      border: "none",
                      color: "#FFBD0C",
                      cursor: "pointer",
                      fontSize: "24px",
                      height: "auto",
                    }}
                    onClick={() => handleChangeStar(data.id, 0)}
                  >
                    ติดดาว
                  </Button>
                </>
              ) : (
                <>
                  <p>ติดดาว</p>
                <Button
                  icon={<StarFilled />}
                  style={{
                    //ไม่เอาขอบ
                    border: "none",
                    color: "#444444",
                    cursor: "pointer",
                    fontSize: "24px",
                    height: "auto",
                  }}
                  onClick={() => handleChangeStar(data.id, 1)}
                >
                  ไม่ติดดาว
                </Button>
                </>

              )}
            </Card>
          </Col>
          <Col flex="auto">
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
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
                <Input defaultValue={data.province} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="อำเภอ/เขต" name="amphoe">
                <Input defaultValue={data.amphoe} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="ตำบล/แขวง" name="district">
                <Input defaultValue={data.district} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="รหัสไปรณีย์" name="zipcode">
                <Input defaultValue={data.zipcode} style={{ width: "100%" }} />
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

              {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
            </Form>
          </Col>
        </Row>
      </Paragraph>
    </div>
  );
}

export default DetailCompanyPage;
