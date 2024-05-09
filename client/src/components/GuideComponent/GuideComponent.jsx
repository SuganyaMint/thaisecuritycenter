import React, { useState, useEffect } from "react";
import recom from "../../assets/icon/newrecom.png";
import sampleImage from "../../assets/image/banner250200.png";
import "../../assets/scss/style.scss";
function GuideComponent(props) {
  const numImages = props.numImages;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dataImage = {
    imgUrl: sampleImage,
    title: "Company title",
    address: "The address of company?",
    contact: "contact & phone",
  };

  const renderCards = () => {
    const cards = [];
    const numToShow = showAll ? 10 : numImages;
    for (let i = 0; i < numToShow; i++) {
      cards.push(
        <div className="card " key={i}>
          <div
            style={{
              // width: "250px",
              width: "100%",
              backgroundColor: "#ECECEC",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <figure>
              <img
                src={dataImage.imgUrl}
                alt="Shoes"
                width="100%"
                height="200px"
              />
            </figure>
            <div
              className="card-body "
              style={{
                width:"100%",
                height: "170px",
                marginTop: "-20px",
              }}
            >
              <p
                className="card-title"
                style={{
                  fontSize: windowWidth < 768 ? "14px" : "18px",
                }}
              >
                {dataImage.title}
              </p>
              <p
                style={{
                  fontSize: windowWidth < 768 ? "10px" : "16px",
                }}
              >
                {dataImage.address}
              </p>
              <p
                style={{
                  fontSize: windowWidth < 768 ? "10px" : "16px",
                }}
              >
                {dataImage.contact}
              </p>

              <div
                style={{
                  height: "50px",
                  display: "flex",
                  justifyContent: " right",
                  alignItems: "right",
                }}
              >
                <button
                  className="btn btn-active btn-sm"
                  style={{
                    backgroundColor: "#FFD700",
                    color: "#000000",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    width: windowWidth < 768 ? "50px" : "100px",
                    fontSize: windowWidth < 768 ? "7px" : "12px",
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    boxShadow: "0 0 5px #868686",
                  }}
                >
                  ดูเพิ่มเติม
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return cards;
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
      }}
    >
      {numImages === 4 ? (
        <div
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
      ) : (
        <div
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={recom}
            alt="recom"
            className={windowWidth < 768 ? "shake-small" : "shake-large"} // เลือกคลาส animation ตามเงื่อนไขขนาดหน้าจอ
            style={{
              width: windowWidth < 768 ? "250px" : "400px",
              height: "auto",
            }}
          />
        </div>
      )}

      <div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {renderCards()}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "20px",
          }}
        >
          {!showAll ? (
            <button
              className="btn btn-outline btn-sm mt-10 transition"
              onClick={handleShowMore}
              style={{
                backgroundColor: "#FFD700",
                color: "#000000",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                width: "100px",
                boxShadow: "0 0 5px #868686",
              }}
            >
              ดูทั้งหมด
            </button>
          ) : (
            <button
              className="btn btn-outline btn-warning btn-sm mt-10"
              onClick={handleShowLess}
              style={{
                backgroundColor: "#FFD700",
                color: "#000000",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                width: "100px",
                boxShadow: "0 0 5px #868686",
              }}
            >
              ย่อ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuideComponent;
