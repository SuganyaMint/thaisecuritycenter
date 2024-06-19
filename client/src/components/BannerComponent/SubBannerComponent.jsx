import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import SkeletonComponent from "../SkeletonComponent/SkeletonComponent";
import Swal from "sweetalert2";

function SubBannerComponent(props) {
  const page = props.page;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.SubBanner);
      if (res.data.status === true) {
        setLoading(false);
        if (res.data.data.length === 0) {
          setLoading(false);
        } else {
          let dataArr = [];
          res.data.data.map((item) => {
            if (item.status === 1) {
              dataArr.push(item);
            }
          });

          setData(dataArr);
          const itemsWithImages = await Promise.all(
            dataArr.map(async (item) => {
              try {
                const imageRes = await API.post(
                  ApiRouter.SubBannerImage,
                  {
                    filename: item.link,
                  },
                  {
                    responseType: "arraybuffer",
                  }
                );

                const blob = new Blob([imageRes.data], { type: "image/jpeg" });
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
          setData(itemsWithImages);
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

  return (
    <>
      {loading ? (
        SkeletonComponent
      ) : (
        <div
          style={{
            width: page === "home" ? "100%" : "90%",
            margin: "auto",
          }}
        >
          <Carousel
            autoplay
            style={{
              marginTop: page === "home" ? "0px" : "20px",
            }}
          >
            {data.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    src={item.img}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default SubBannerComponent;
