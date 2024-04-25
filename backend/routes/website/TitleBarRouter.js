const express = require("express");
const router = express.Router();

const {
  getTitleBar,
  createTitleBar,
  updateTitleBar,
  deleteTitleBar,
} = require("../../controllers/website/TitleBarController");

router.get("/", getTitleBar);
router.post("/", createTitleBar);
router.put("/:id", updateTitleBar);
router.delete("/:id", deleteTitleBar);

module.exports = router;
