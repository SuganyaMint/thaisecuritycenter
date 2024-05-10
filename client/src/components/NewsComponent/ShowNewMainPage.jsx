import React, { useState, useEffect } from "react";
import SubBannerComponent from "../BannerComponent/SubBannerComponent";
import facebookImage from "../../assets/image/facebook.png";
import facebookImage2 from "../../assets/image/facebook2.png";

import { Link } from "react-router-dom";

function ShowNewMainPage() {
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

  return (
    <>
      <div
        style={{
        //   display: "flex",
          margin: "auto",
          width: "90%",
          height: "auto",
          marginTop: "20px",
          //   border: "1px solid black",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2"
          style={{
            width: "100%",
            display: windowWidth < 768 ? null : "flex",
            justifyContent: "center",
            // border: "1px solid blue",
          }}
        >
          <div
            style={{
              width: windowWidth < 768 ? "100%" : "30%",
              height: "100%",
              marginRight: "10px",
            }}
          >
            <Link
              to="https://www.facebook.com/thaisecure.ad?mibextid=JRoKGi"
              target="_blank"
            >
              <img
                src={windowWidth < 768 ? facebookImage2 : facebookImage}
                alt="Facebook"
              />
            </Link>
          </div>
          <div
            style={{
              width: windowWidth < 768 ? "100%" : "70%",
              height: "100%",
              background: windowWidth < 768 ? null : "#000000",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                margin: "auto",
                marginBlock: "auto",
                marginTop: "6px",
              }}
            >
              <SubBannerComponent page="home" />
            </div>
          </div>
        </div>{" "}

        <div
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1"
          style={{
            width: "100%",
            height: windowWidth < 768 ? "50px" : "200px",

            justifyContent: "center",
            marginTop: windowWidth < 768 ? "0px" : "20px",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid red",
            }}
          >
            news1
          </div>
          <div
            style={{
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid red",
            }}
          >
            news2
          </div>
          <div
            style={{
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid red",
            }}
          >
            news3
          </div>
          <div
            style={{
              width: "25%",

              justifyContent: "center",
              alignItems: "center",
              border: "1px solid red",
            }}
          >
            news4
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowNewMainPage;
