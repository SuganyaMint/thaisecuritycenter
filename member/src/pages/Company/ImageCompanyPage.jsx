import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
const { TabPane } = Tabs;
import { useNavigate } from "react-router-dom";
const { items } = Tabs;
import { LeftCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider, Typography, Image, Tabs, Upload, Button } from "antd";
const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import ChangeImage from "../../components/CompanyComponent/ChangeImage";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function ImageCompanyPage() {
  const navigate = useNavigate();
  const company_id = localStorage.getItem("company_id");

  const [loading, setLoading] = useState(true);
  const [dataImage, setDataImage] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  // const num = 5;
  const [num, setNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.CompanyByCompanyId + company_id);
      setData(res.data.data);
      const getDataImage = await API.get(
        ApiRouter.CompanyImageComID + company_id
      );
      const dataImage = getDataImage.data.data;
      if (res.data.status === true) {
        if (res.data.data.length === 0) {
          setLoading(false);
          setDataImage(res.data.data);
        } else {
          const itemsWithImages = await Promise.all(
            dataImage.map(async (item) => {
              // console.log(item.link);
              try {
                const imageRes = await API.post(
                  ApiRouter.CompanyImage,
                  {
                    filename: item.link,
                  },
                  {
                    responseType: "arraybuffer",
                  }
                );
                const blob = new Blob([imageRes.data], {
                  type: "image/jpeg",
                });
                const imageUrl = URL.createObjectURL(blob);
                return {
                  ...item,
                  img: imageUrl,
                  key: item.id,
                };
              } catch (error) {
                console.error("Error fetching image:", error);
                return item;
              }
            })
          );
          setDataImage(itemsWithImages);
          if (res.data.data.hire === 0) {
            setNum(5 - itemsWithImages.length);
          } else {
            setNum(20 - itemsWithImages.length);
          }
          setLoading(false);
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "เกิดข้อผิดพลาด ไม่สามารถดึงข้อมูลได้ โปรดลองใหม่อีกครั้ง",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ลองใหม่อีกครั้ง",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "กำลังโหลด",
              text: "โปรดรอสักครู่...",
              icon: "info",
              showConfirmButton: false,
              allowOutsideClick: false,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            Swal.fire({
              title: "กำลังยกเลิกและกลับสู่หน้าหลัก",
              text: "โปรดรอสักครู่...",
              icon: "info",
              showConfirmButton: false,
              allowOutsideClick: false,
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          }
        });
      }
    };
    fetchData();
    setIsSubmit(false);
  }, [isSubmit]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinished = async () => {
    const formData = new FormData();
    Array.from(fileList).forEach((file) => {
      // formData.append("files", file);
      formData.append("files", file.originFileObj);
    });
    formData.append("order", 1);
    formData.append("status", 1);

    Swal.fire({
      icon: "question",
      title: "คุณต้องการเพิ่มรูปภาพไหม?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่ใช่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await API.put(
            ApiRouter.CompanyUpdateImage + company_id,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.status === true) {
            setIsSubmit(true);
            Swal.fire("Saved!", "", "success");
            // setTimeout 1 sec
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            Swal.fire("Error!", "", "error");
          }
        } catch (error) {
          console.error("Upload Error:", error);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const onDelete = async (id) => {
    // CompanyImage

    Swal.fire({
      icon: "warning",
      title: "คุณต้องการลบรูปภาพใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่, ลบ!",
      denyButtonText: `ไม่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.delete(ApiRouter.CompanyImage + "/" + id);
        if (res.data.status === true) {
          Swal.fire("Saved!", "", "success");
          setIsSubmit(true);
        } else {
          Swal.fire("Error!", "", "error");
        }

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
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
          รูปภาพบริษัทของคุณ
        </p>
      </div>

      {loading ? (
        <>
          <SkeletonComponent />
        </>
      ) : (
        <>
          {dataImage.length === 0 ? (
            <div
              style={{
                display: "flex",
                //  justifyContent: "center",
                height: "100vh",
                flexDirection: "column", // เปลี่ยนเป็นแนวตั้ง
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // เปลี่ยนเป็นแนวตั้ง
                  alignItems: "center",
                }}
              >
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= num - dataImage.length
                    ? null
                    : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
              <div>
                <Button
                  onClick={onFinished}
                  type="primary"
                  style={{
                    marginTop: 20,
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  เพิ่มรูปภาพ
                </Button>
              </div>
            </div>
          ) : (
            <>
              {num <= 0 ? (
                <>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Free account สามารถ Update รูปภาพได้สูงสุด 5 ภาพ
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Upgrate account{" "}
                    <a
                      href="https://thaisecuritycenter-uat.suganya-profiles.com/contact"
                      style={{
                        color: "blue", // ตั้งค่าให้สีของลิงก์เหมือนกับสีข้อความ
                        textDecoration: "none", // ลบเส้นใต้ของลิงก์
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ติดต่อเจ้าหน้าที่
                    </a>
                  </p>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= num ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: "none",
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                  <Button
                    onClick={onFinished}
                    type="primary"
                    style={{
                      marginTop: 20,
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    เพิ่มรูปภาพ
                  </Button>
                </div>
              )}

              <Divider
                style={{
                  border: "1px solid #000",
                }}
              />
              <div
                style={{
                  display: "flex",
                  width: "60%",
                  justifyContent: "center",
                  // alignItems: "center",
                  margin: "auto",
                }}
              >
                {" "}
                <div
                  style={{
                    width: "50%",
                    flexWrap: "wrap",
                  }}
                >
                  {dataImage.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          width: "auto",
                          height: "auto",
                          // margin: 10,
                        }}
                      >
                        <Image
                          src={item.img}
                          style={{
                            width: "auto",
                            height: 150,
                            objectFit: "cover",
                          }}
                        />
                        <Divider
                          style={{
                            border: "1px solid #000",
                            width: "100%",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  {dataImage.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          height: 150,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ChangeImage id={item.id} />
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            onDelete(item.id);
                          }}
                        >
                          ลบ
                        </Button>
                      </div>
                      <Divider
                        style={{
                          border: "1px solid #000",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
export default ImageCompanyPage;
