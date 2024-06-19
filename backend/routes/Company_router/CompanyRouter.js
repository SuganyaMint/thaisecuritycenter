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
  getCompanyClient,
  toptenCompany,
  getCompanyByAmphoe,
  getCompanyByProvince,
  updateMap,
  getCompanyByMemberId,
  getCompany_COMPANYID,
  updateDescription,
  updateAllImage,
  deleteImageByID, updateOneImageCompany,
  updateDetail

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

router.get("/top/ten", toptenCompany);
router.get("/amphoe/:amphoe", getCompanyByAmphoe);
router.get("/province/:province", getCompanyByProvince);

router.put("/map/:company_id", updateMap);
router.put("/desc/:company_id", updateDescription);

router.get("/member/:member_id", getCompanyByMemberId);
router.get("/company/:company_id", getCompany_COMPANYID);

router.put("/image/:company_id", updateAllImage);
router.put("/detail/:company_id", updateDetail);
router.put("/image/one/:id", updateOneImageCompany);


router.delete("/image/:id", deleteImageByID);



module.exports = router;
