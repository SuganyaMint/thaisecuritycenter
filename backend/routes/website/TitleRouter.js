const express = require("express");
const router = express.Router();

const {
  getTitle,
  createTitle,
  updateTitle,
  deleteTitle,
} = require("../../controllers/website/TitleController");

router.get("/", getTitle);
router.post("/", createTitle);
router.put("/:id", updateTitle);
router.delete("/:id", deleteTitle);

module.exports = router;
