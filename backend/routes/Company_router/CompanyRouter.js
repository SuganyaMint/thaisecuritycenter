const express = require("express");
const router = express.Router();

const {
  getCompanyImage,
  getCompany,
  getCompanyById,
  createCompany,
  delelteCompanyById,
  changeStatusCompany,
  fixStart,
  getImageByCompanyId,
  getDataComIDImage,
  getDataLogoImage,
  changeHire,
  getCompanyClient
} = require("../../controllers/Company/CompanyController");

router.get("/", getCompany);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.delete("/:id", delelteCompanyById);
router.post("/image", getCompanyImage);
router.post("/imageAll/company/:company_id", getImageByCompanyId);
router.get("/imageComID/company/:company_id", getDataComIDImage);
router.get("/image/logo", getDataLogoImage);
router.get("/show/to/client", getCompanyClient);

router.put("/status/:id", changeStatusCompany);
router.put("/star/:id", fixStart);
router.put("/hire/:id", changeHire);


module.exports = router;
