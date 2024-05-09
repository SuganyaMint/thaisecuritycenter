import React, { useState, useEffect } from "react";
import LongLogo from "../../assets/image/longlogo.jpg";
import smallLogo from "../../assets/image/logo1.png";

import TolIcon from "../../assets/icon/Group 11tol.png";

function TopNavbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getImageToShow = () => {
    if (windowWidth < 768) {
      return smallLogo;
    } else {
      return LongLogo;
    }
  };
  const fontSize = windowWidth < 768 ? "20px" : "36px";
  const marginTop = windowWidth < 768 ? "-10px" : "-30px";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSmall((prevIsSmall) => !prevIsSmall);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              src={getImageToShow()}
              alt="Responsive Image"
              className="mx-auto"
              style={{
                width: getImageToShow() === smallLogo ? "80px" : "250px",
                height: "auto",
                marginTop: getImageToShow() === smallLogo ? "-5px" : "10px",
                marginLeft: "20px",
              }}
            />

            <img
              src={TolIcon}
              alt="Logo"
              style={{
                width: "265px",
                height: "45px",
                marginTop: "10px",
                marginRight: "20px",
              }}
            />
          </div>
        </div>
        <div
          className="animate-bounce"
          style={{
            height: "30px",
            textAlign: "center",
            paddingTop: "5px",
          }}
        >
          <p
            style={{
              // animation: "textAnimation 4s infinite alternate",
              color: "#E7AF00",
              fontSize: fontSize,
              marginTop: marginTop,
            }}
          >
            รวมรายชื่อบริษัท รปภ. ทั่วเมืองไทย
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
