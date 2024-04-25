import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import EditItemComponent from "./EditItemComponent";

function ItemsInGroupComponent(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.HotpackItem + "/" + props.group_id);
      if (res.data.status === true) {
        setData(res.data.data);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    setIsModalOpen(false);
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะลบรายการนี้?",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ใช่, ฉันต้องการลบ!",
    }).then(async (result) => {
      const res = await API.delete(ApiRouter.HotpackItem + "/" + id);
      if (res.data.status === true) {
        Swal.fire("ลบรายการสำเร็จ!", "", "success");
        //set timeout 2 sec
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire("ลบรายการไม่สำเร็จ!", "", "error");
      }
    });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          width: 150,
        }}
      >
        ดูรายละเอียด
      </Button>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          รายละเอียด
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
            maxWidth: 1000,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          ></Form.Item>
          {data.map((item) => (
            <Form.Item
              wrapperCol={{
                offset: 2,
                span: 16,
              }}
              key={item.id} // Make sure to provide a unique key for each item
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //   border: "1px solid #E5E5E5",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // border: "1px solid #E5E5E5",
                    marginRight: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "500px",
                    }}
                  >
                    <h2 style={{ color: "#7A7A7A", fontSize: 16 }}>
                      {item.item_id} - {item.item_desc}
                    </h2>
                    <h2 style={{ color: "#0088D6", width: 50, fontSize: 16 }}>
                      x {item.amount}
                    </h2>
                  </div>
                </div>

                <div
                  style={{
                    // border: "1px solid #E5E5E5",
                    width: "100px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <EditItemComponent
                    id={item.id}
                    item_desc={item.item_desc}
                    item_id={item.item_id}
                    amount={item.amount}
                  />
                  <Button
                    danger
                    style={{
                      margin: "0 8px",
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    ลบ
                  </Button>
                </div>
              </div>
            </Form.Item>
          ))}
          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 16,
            }}
          >
            <Button type="primary" onClick={handleCancel}>
              Ok
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default ItemsInGroupComponent;
