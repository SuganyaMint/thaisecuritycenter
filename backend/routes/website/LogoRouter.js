const express = require("express");
const router = express.Router();
const LogoController = require("../../controllers/website/LogoController");

router.get("/", LogoController.getLogo);
router.get("/:status", LogoController.getLogoByStatus);
router.post("/", LogoController.createLogo);
router.put("/:id", LogoController.updateLogo);
router.delete("/:id", LogoController.deleteLogo);
router.post("/image", LogoController.getLogoImage);

module.exports = router;