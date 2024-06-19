import React, { useState } from "react";
import ApiUrl from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import CompanyPage from "../pages/Company/CompanyPage";

function HomePage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await ApiUrl.post(ApiRouter.Banner, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <>
      <div>
      <CompanyPage/>
      </div>
    </>
  );
}

export default HomePage;
