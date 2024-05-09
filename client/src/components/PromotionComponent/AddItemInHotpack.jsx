import React, { useState } from "react";
import { Button, Modal, Form, Input, Space, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

function AddItemInHotpack(props) {
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
    // console.log("Success:", values);
    let data = {
      group_id: props.group_id,
      items: values.items,

    };
    setIsModalOpen(false);
    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการเพิ่ม Item ใน Hotpack หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.HotpackItem, data);
        if (res.data.status === true) {
          Swal.fire({
            title: "Success!",
            text: "เพิ่ม Item ใน Hotpack สำเร็จ",
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
            text: "เกิดข้อผิดพลาด ไม่สามารถเพิ่ม Item ใน Hotpack ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancel!",
          text: "ยกเลิกการเพิ่ม Item ใน Hotpack",
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
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "#01567B",
          borderColor: "#01567B",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          width: 150,
        }}
      >
        เพิ่ม Item ใน Hotpack
      </Button>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          เพิ่ม Item ใน Hotpack
        </h1>

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
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          >
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "item_id"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing id",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: 150,
                          }}
                          placeholder="ID"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "Description"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Description",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: 300,
                          }}
                          placeholder="Description"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "Amount"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Amount",
                          },
                        ]}
                      >
                        <InputNumber placeholder="Amount" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{
                        width: 550,
                      }}
                    >
                      เพิ่ม Items
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginRight: 10,
              }}
            >
              Submit
            </Button>
            <Button type="primary" danger onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddItemInHotpack;
