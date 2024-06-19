import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Divider, Typography, Button, Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";

import Sample1 from "../../assets/sample1.png";

function DescriptionCompanyPage() {
  const navigate = useNavigate();
  const company_id = localStorage.getItem("company_id");
  const member_id = localStorage.getItem("member_id");
  const editorRef = useRef(null);
  //get local storage company_id
  const [loading, setLoading] = useState(true);
  const [dataImage, setDataImage] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  // const [data, setData] = useState([]);
  // const data = props.data.detail;

  const handleImagePicker = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = {
          src: reader.result,
          alt: file.name,
        };

        callback(imageData.src, {
          alt: file.name,
        });
        setSelectedImage(imageData);
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  const [detail, setDetail] = useState("");

  const onchange = (e) => {
    setDetail(e.target.value);
  };

  const [oldDescription, setOldDescription] = useState("");
  const [oldDetail, setOldDetail] = useState("");
  const [oldData, setOldData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const getCompany = await API.get(
        ApiRouter.CompanyByCompanyId + company_id
      );
      setOldDescription(getCompany.data.data.description);
      setOldDetail(getCompany.data.data.detail);
      setOldData(getCompany.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onFinished = async () => {
    Swal.fire({
      icon: "question",
      title: "คุณต้องการบันทึกข้อมูลหรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่, บันทึกข้อมูล",
      denyButtonText: `ไม่ใช่, ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.put(
          ApiRouter.CompanyUpdateDescription + company_id,
          {
            description: editorRef.current.getContent(),
            detail: detail,
          }
        );
        if (res.data.status === true) {
          Swal.fire("Saved!", "", "success");
          //set time out 2 sec to /mycompany
          setTimeout(() => {
            navigate("/mycompany");
          }, 2000);
        } else {
          Swal.fire("Error!", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const onEdit = async () => {
    Swal.fire({
      icon: "question",
      title: "คุณต้องการแก้ไขข้อมูลหรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่, บันทึกข้อมูล",
      denyButtonText: `ไม่ใช่, ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.put(
          ApiRouter.CompanyUpdateDescription + company_id,
          {
            description: editorRef.current.getContent(),
            detail: detail ? detail : oldDetail,
          }
        );
        if (res.data.status === true) {
          Swal.fire("Saved!", "", "success");
          //set time out 2 sec to /mycompany
          setTimeout(() => {
            navigate("/mycompany");
          }, 2000);
        } else {
          Swal.fire("Error!", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                รายละเอียดบริษัทของคุณ
              </p>
            </div>
          </div>
          <Divider
            style={{
              borderTop: "2px solid #898989",
            }}
          />
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            คำอธิบายสั้นๆ สำหรับหน้าแรกของเว็บไซต์
          </p>
          <p
            style={{
              color: "red",
            }}
          >
            ตัวอย่าง
          </p>

          <img
            src={Sample1}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TextArea
              defaultValue={oldDetail}
              onChange={onchange}
              style={{
                width: "90%",
                border: "1px solid #d9d9d9",
              }}
              rows={4}
              // placeholder="คำอธิบายสั้นๆ สำหรับหน้าแรกของเว็บไซต์"
            />
          </div>

          <Divider
            style={{
              borderTop: "2px solid #898989",
            }}
          />
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            คำอธิบายที่ทำให้บริษัทของคุณโดดเด่นขึ้น
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paragraph>
              <Editor
                initialValue={oldDescription}
                apiKey="goune2ih3hh5ximl230hx82fc2lc4kufbxx5m0rh31yew1ku"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  width: "100%",
                  height: 600,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "textcolor",
                  ],
                  toolbar:
                    "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image | preview media fullscreen | " +
                    "forecolor backcolor emoticons | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  file_picker_types: "image",
                  file_picker_callback: handleImagePicker,
                }}
              />
            </Paragraph>
            {Object.keys(oldData).length > 0 ? (
              <Button
                onClick={onEdit}
                type="primary"
                style={{
                  marginTop: 20,
                  //shadow
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                แก้ไขคำอธิบาย
              </Button>
            ) : (
              <Button
                onClick={onFinished}
                type="primary"
                style={{
                  marginTop: 20,
                  //shadow
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                บันทึกคำอธิบาย
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DescriptionCompanyPage;
