const express = require("express");
const router = express.Router();

const { getBanner, createBanner, getBannerImage, deleteBanner, updateBanner , updatePictureBanner } = require("../../controllers/website/BannerController");

router.get("/", getBanner);
router.post("/", createBanner);
router.post("/image", getBannerImage);
router.delete("/:id", deleteBanner);
router.put("/:id", updateBanner);
router.put("/update/image/:id", updatePictureBanner);

module.exports = router;