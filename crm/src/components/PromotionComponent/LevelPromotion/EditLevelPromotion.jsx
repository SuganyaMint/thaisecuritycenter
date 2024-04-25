import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  InputNumber,
  DatePicker,
} from "antd";
import Swal from "sweetalert2";
import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";
import moment from "moment";

function EditLevelPromotion(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [expiry, setExpiry] = useState(props.data.expiry);
  const [amount, setAmount] = useState(props.data.amount);
  const [title, setTitle] = useState(props.data.title);
  const [level, setLevel] = useState(props.data.level);
  const [discount , setDiscount] = useState(props.data.discount)
  const [isSubmit, setIsSubmit] = useState(false);

  const expiryCurrent = props.data.expiry;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {

        await API.put(ApiRouter.LevelPromotion + "/" + props.data.id, {
          title: values.title === undefined ? title : values.title,
          level: values.level === undefined ? level : values.level,
          expiry:
            expiry === undefined
              ? expiryCurrent
              : moment(expiry).format("YYYY-MM-DD"),
          amount: values.amount === undefined ? amount : values.amount,
          discount: values.discount === undefined ? discount : values.discount,
        }).then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              title: "Success!",
              text: "เพิ่มข้อมูลสำเร็จ",
              icon: "success",
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                setIsSubmit(true);
                setIsModalOpen(false);
                form.resetFields();
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          } else {
            message.error("เพิ่มข้อมูลไม่สำเร็จ");
          }
        });
      
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          backgroundColor: "#FFC300",
          width: 200,
          marginBottom: 10,
        }}
        //   shape="round"
        //   size="large"
      >
        แก้ไข
      </Button>
      <Modal
        //   title="EDIT LEVEL PROMOTION"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          EDIT LEVEL PROMOTION
        </p>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 900,
            marginTop: 40,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Title" name="title">
            <Input defaultValue={title} />
          </Form.Item>
          <Form.Item label="Level" name="level">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={level}
            />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={amount}
            />
          </Form.Item>
          <Form.Item label="Discount" name="discount">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={discount}
            />
          </Form.Item>
          <Form.Item label="Expiry" name="expiry">
            <DatePicker
              defaultValue={moment(expiryCurrent)}
              //   onChange={onChangeExpire}
              onChange={(dateString) => {
                setExpiry(dateString.format("YYYY-MM-DD"));
              }}
            />
          </Form.Item>

          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={img}
              alt="Blob Image"
              style={{
                width: "150px",
                height: "150px",
              }}
            />
          </div> */}

          {/* <Form.Item
            name="image"
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
          >
            <Dragger {...props2}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                คลิกหรือลากไฟล์ที่นี่เพื่ออัปโหลด
              </p>
              <p className="ant-upload-hint">
                รองรับการอัปโหลดไฟล์เป็นรูปภาพเท่านั้น
              </p>
            </Dragger>
          </Form.Item> */}
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditLevelPromotion;
