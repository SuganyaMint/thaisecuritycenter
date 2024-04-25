import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  InputNumber,
} from "antd";
import Swal from "sweetalert2";

import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";

function EditWeekPromotion(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    try {
      await API.put(ApiRouter.WeekPromotion + props.data.id,  {
        title: values.title === undefined ? props.data.title : values.title,
        description: values.discrption  === undefined ? props.data.description : values.discrption,
        limit: values.limit === undefined ? props.data.limit : values.limit,
        reset_limit: values.reset_limit === undefined ? props.data.reset_limit : values.reset_limit,
        price: values.price === undefined ? props.data.price : values.price,
        discount: values.discount === undefined ? props.data.discount : values.discount,
        pack_no: values.pack_no === undefined ? props.data.pack_no : values.pack_no,

      }).then((res) => {
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "แก้ไขข้อมูลสำเร็จ",
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
          message.error("แก้ไขข้อมูลไม่สำเร็จ");
        }
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาด", error);
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
          //สีเหลือง
          backgroundColor: "#fbb040",
          width: 200,
        }}
      >
        แก้ไข
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <p
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          EDIT WEEK PROMOTION
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
            <Input defaultValue={props.data.title} />
          </Form.Item>

          <Form.Item label="Discrption" name="discrption">
            <Input.TextArea defaultValue={props.data.description} />
          </Form.Item>
          <Form.Item label="Limit" name="limit">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={props.data.limit}
            />
          </Form.Item>
          <Form.Item label="Reset Limit" name="reset_limit">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={props.data.reset_limit}
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={props.data.price}
            />
          </Form.Item>
          <Form.Item label="Discount" name="discount">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={props.data.discount}
            />
          </Form.Item>
          <Form.Item label="Pack No" name="pack_no">
            <InputNumber
              style={{
                width: "100%",
              }}
              defaultValue={props.data.pack_no}
            />
          </Form.Item>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditWeekPromotion;
