const express = require("express");
const router = express.Router();

const {
    getCompanyImage,
    getCompany,
    getCompanyById,
    createCompany,
    delelteCompanyById,
} = require("../../controllers/Company/CompanyController");

router.get("/", getCompany);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.delete("/:id", delelteCompanyById);
router.get("/image/:id", getCompanyImage);


module.exports = router;
