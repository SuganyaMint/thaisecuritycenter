import React, { useState, useEffect } from "react";
import ApiUrl from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import BannerComponent from "../components/BannerComponent/BannerComponent";
import GuideComponent from "../components/GuideComponent/GuideComponent";
import TopCompany from "../components/TopCompanyComponent/TopCompany";
import { UpCircleOutlined } from "@ant-design/icons";
import ShowNewMainPage from "../components/NewsComponent/ShowNewMainPage";

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // เพิ่ม event listener เมื่อ scroll หน้าเว็บ
    window.addEventListener("scroll", toggleVisibility);
    // ลบ event listener เมื่อ component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    // ตรวจสอบว่า scroll ไปยังด้านบนของหน้าเว็บหรือไม่
    if (window.pageYOffset > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <BannerComponent />
      <GuideComponent numImages={8} />
      <ShowNewMainPage />
      <TopCompany />
      {isVisible && (
        <span
          className="fixed bottom-20 right-20 block bg-yellow-400 hover:bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 opacity-50 hover:opacity-100"
          onClick={scrollToTop}
        >
          <UpCircleOutlined style={{ fontSize: "24px" }} />
        </span>
      )}
    </>
  );
}

export default HomePage;
