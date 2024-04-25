const express = require("express");
const router = express.Router();

const {
  getButton,
  getButtonByStatus,
  getButtonById,
  createButton,
  updateButton,
  deleteButton,
  getButtonImage,
  updateButtonImage,
} = require("../../controllers/website/ButtonController");

router.get("/", getButton);
router.get("/:status", getButtonByStatus);
router.get("/detail/:id", getButtonById);
router.post("/", createButton);
router.put("/:id", updateButton);
router.delete("/:id", deleteButton);
router.post("/image", getButtonImage);
router.put("/image/:id", updateButtonImage);

module.exports = router;
