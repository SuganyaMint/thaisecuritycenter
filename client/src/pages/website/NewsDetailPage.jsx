import React, { useState, useEffect } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import "../../assets/scss/style.scss";
function NewsDetailPage() {
  const article_idParams = useParams();
  const article_id = article_idParams.article_id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.Article + "/" + article_id);
      if (res.data.status === true) {
        setLoading(false);
        if (res.data.data.length === 0) {
          setLoading(false);
        } else {
          setData(res.data.data);
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
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div
          style={{
            width: windowWidth > 768 ? "80%" : "90%",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                //สีเหลือง
                color: "#E4BB00",
              }}
            >
              {data.topic.replace(/&quot;/g, "'")}
            </p>
            <p>{data.visited}</p>
          </div>
          <div className="divider"></div>
          <div
            style={{
              //   display: "flex",
              width: "100%",
              margin: "auto",
            }}
          >
            <div
              className="divContainer"
              dangerouslySetInnerHTML={{
                __html: data.detail.replace(/&quot;/g, "'"),
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default NewsDetailPage;
