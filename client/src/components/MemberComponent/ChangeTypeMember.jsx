import React, { useState } from "react";
import { Button, Modal, Tag, Form, Select } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

function ChangeTypeMember(props) {
  console.log(props);
  const id = props.data.id;
  const memberType = props.data.memberType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการเปลี่ยน Member type หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.put(ApiRouter.ChangeTypeMember + id, {
          memberType: values.memberType,
        });
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "Update Member type สำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsModalOpen(false);
          //set time out
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          Swal.fire({
            title: "Error!",
            text: "เกิดข้อผิดพลาด ไม่สามารถupdate Member type ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "ยกเลิกการ Update Member type ได้",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      {memberType === "pay" ? (
        <>
          <Tag
            color="green"
            onClick={showModal}
            style={{
              cursor: "pointer",
            }}
          >
            PAY
          </Tag>
        </>
      ) : (
        <>
          {" "}
          <Tag
            color="red"
            onClick={showModal}
            style={{
              cursor: "pointer",
            }}
          >
            FREE
          </Tag>
        </>
      )}

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
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
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            เปลี่ยนชนิดลูกค้า
          </h1>

          <Form.Item
            label="ชนิดสมาชิก"
            name="memberType"
            rules={[
              {
                required: true,
                message: "Please input type member!",
              },
            ]}
          >
            <Select
              defaultValue={memberType}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "pay", label: "PAY" },
                { value: "free", label: "FREE" },
              ]}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ChangeTypeMember;
