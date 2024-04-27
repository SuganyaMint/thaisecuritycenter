import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Divider, Typography, Image, Tabs } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const { Title, Paragraph } = Typography;
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";

function DescriptionCompanyPage(props) {
  const editorRef = useRef(null);
  const { company_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dataImage, setDataImage] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  // const [data, setData] = useState([]);
  const data = props.data.detail;

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

  return (
    <>
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
            apiKey="goune2ih3hh5ximl230hx82fc2lc4kufbxx5m0rh31yew1ku"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={data}
            init={{
              width: "100%",
              height: 1000,
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
      </div>
      {/* )} */}
    </>
  );
}

export default DescriptionCompanyPage;
