import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import SearchComponent from "../SearchComponent/SearchComponent";

function NavbarComponent() {
  const [activeLink, setActiveLink] = useState(null);

  function handleClick(event) {
    setActiveLink(event.target.innerText);
  }

  // เพิ่มการตรวจจับเหตุการณ์ click ให้กับทุกลิงก์
  const links = document.querySelectorAll(".menu a");
  links.forEach((link) => {
    link.addEventListener("click", handleClick);
  });

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      style={{
        marginTop: "10px",
      }}
    >
      <div className="navbar bg-yellow-500 ">
        <div className="navbar-start flex-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link to="/" onClick={toggleMenu}>
                  <li>
                    <a>หน้าหลัก</a>
                  </li>
                </Link>
                <Link to="/searchcompany" onClick={toggleMenu}>
                  <li>
                    <a> ค้นหาบริษัท รปภ.</a>
                  </li>
                </Link>
                <Link to="/advertise" onClick={toggleMenu}>
                  <li>
                    <a>โฆษณากับเรา</a>
                  </li>
                </Link>
                <Link to="/contact" onClick={toggleMenu}>
                  <li>
                    <a>ติดต่อเรา</a>
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
        {/* <div className="navbar-center hidden lg:flex"> */}

        <div className="navbar-center hidden lg:flex flex-start">
          <ul className="menu menu-horizontal px-1">
            <Link to="/">
              <li>
                <a
                  style={{
                    color: activeLink === "หน้าหลัก" ? "orange" : "#FFFFFF",
                    fontSize: "20px",
                    backgroundColor: activeLink === "หน้าหลัก" ? "white" : "",
                  }}
                  onClick={handleClick}
                >
                  หน้าหลัก
                </a>
              </li>
            </Link>
            <Link to="/searchcompany">
              <li>
                <a
                  style={{
                    color:
                      activeLink === "ค้นหาบริษัท รปภ." ? "orange" : "#FFFFFF",
                    fontSize: "20px",
                    backgroundColor:
                      activeLink === "ค้นหาบริษัท รปภ." ? "white" : "",
                  }}
                  onClick={handleClick}
                >
                  ค้นหาบริษัท รปภ.
                </a>
              </li>
            </Link>
            <Link to="/advertise">
              <li>
                <a
                  style={{
                    color: activeLink === "โฆษณากับเรา" ? "orange" : "#FFFFFF",
                    fontSize: "20px",
                    backgroundColor:
                      activeLink === "โฆษณากับเรา" ? "white" : "",
                  }}
                  onClick={handleClick}
                >
                  โฆษณากับเรา
                </a>
              </li>
            </Link>
            <Link to="/contact">
              <li>
                <a
                  style={{
                    color: activeLink === "ติดต่อเรา" ? "orange" : "#FFFFFF",
                    fontSize: "20px",
                    backgroundColor: activeLink === "ติดต่อเรา" ? "white" : "",
                  }}
                  onClick={handleClick}
                >
                  ติดต่อเรา
                </a>
              </li>
            </Link>
          </ul>
        </div>

        {windowWidth < 768 ? (
          <>
            <div className="navbar-end">
              {/* <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "24px",
                  right: 50,
                  position: "absolute",
                }}
              >
                <SearchComponent />
              </div> */}

              <div className="navbar-start">
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <UserOutlined
                      style={{
                        color: "#FFFFFF",
                        fontSize: "24px",
                        right: -40,
                        position: "absolute",
                      }}
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
                    style={{
                      right: -40,
                      left: "auto",
                      position: "absolute",
                    }}
                  >
                    <li>
                      <a
                        href="https://thaisecuritycenter-member.suganya-profiles.com/"
                        target="_blank"
                      >
                        เข้าสู่ระบบ
                      </a>{" "}
                    </li>
                    <li>
                      <Link to="/register-member">
                        <a>สมัครสมาชิก</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-end mr-6">
              <Input
                style={{
                  width: "200px",
                }}
                size="large"
                placeholder="Search"
                prefix={
                  <SearchOutlined
                    start={{
                      //สีเหลือง
                      color: "#FFD700",
                    }}
                  />
                }
              />
              <div
                style={{
                  width: "250px",
                  height: "auto",
                  // border: "1px solid #FFFFFF",
                  marginRight: "-20px",
                  display: "flex",
                }}
              >
                <UserOutlined
                  style={{
                    color: "#FFFFFF",
                    fontSize: "24px",
                    marginRight: "8px",
                    marginLeft: "20px",
                  }}
                />

                <a
                  style={{
                    color: "#FFFFFF",
                    fontSize: "16px",
                    backgroundColor:
                      activeLink === "เข้าสู่ระบบ" ? "white" : "",
                  }}
                  onClick={handleClick}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <p>
                      {" "}
                      <a
                        href="https://thaisecuritycenter-member.suganya-profiles.com/"
                        target="_blank"
                      >
                        เข้าสู่ระบบ /
                      </a>{" "}
                    </p>

                    <a
                      href="https://thaisecuritycenter-member.suganya-profiles.com/register"
                      target="_blank"
                    >
                      <p>สมัครสมาชิก </p>
                    </a>
                  </div>
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <a
                  href="https://thaisecuritycenter-member.suganya-profiles.com/register"
                  target="_blank"
                >
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                    style={{
                      width: "120px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    ลงประกาศฟรี
                  </button>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavbarComponent;
