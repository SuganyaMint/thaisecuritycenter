import React, { useState } from "react";
import { Button, Modal, Tag, Form, Select } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

function EditStatusSliderModel(props) {
  const id = props.data.id;
  const status = props.data.status;
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
    let data = {
      id: props.id,
      status: values.status,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการเปลี่ยน Status หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.put(
          ApiRouter.UpdateStatusSlider + id,
          { status: values.status }
        );
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "Update status สำเร็จ",
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
            text: "เกิดข้อผิดพลาด ไม่สามารถupdate status ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "ยกเลิกการ Update status ได้",
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
      {status === 1 ? (
        <>
          <Tag
            color="green"
            onClick={showModal}
            style={{
              cursor: "pointer",
            }}
          >
            ใช้งาน
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
            ไม่ใช้งาน
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
            เปลี่ยนสถานะ
          </h1>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please input your status!",
              },
            ]}
          >
            <Select
              defaultValue={status}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 0, label: "ไมได้ใช้งาน" },
                { value: 1, label: "กำลังใช้งาน" },
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


export default EditStatusSliderModel