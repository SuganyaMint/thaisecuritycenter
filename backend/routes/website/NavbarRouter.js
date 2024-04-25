const express = require("express");
const router = express.Router();

const {
  getNavbar,
  createNavbar,
  updateNavbar,
  deleteNavbar
} = require("../../controllers/website/NavBarController");

router.get("/", getNavbar);
router.post("/", createNavbar);
router.put("/:id", updateNavbar);
router.delete("/:id", deleteNavbar);

module.exports = router;
