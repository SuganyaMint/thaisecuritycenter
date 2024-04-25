const express = require("express");
const router = express.Router();

const {
  getSlider,
  getSliderByStatus,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider,
  getSliderImage,
  updateStatusSlider,
  updateLinkAction,
  updateSliderImage,
} = require("../../controllers/website/SliderController");

router.get("/", getSlider);
router.get("/:status", getSliderByStatus);
router.get("/detail/:id", getSliderById);
router.post("/", createSlider);
router.put("/:id", updateSlider);
router.delete("/:id", deleteSlider);
router.post("/image", getSliderImage);
router.put("/status/:id", updateStatusSlider);
router.put("/link/:id", updateLinkAction);
router.put("/image/:id", updateSliderImage);

module.exports = router;
