const express = require("express");
const router = express.Router();

const {
  createContact_me,
  getContact_me,
  getContact_meById
} = require("../../controllers/Contact/ContactController");

router.get("/", getContact_me);
router.post("/", createContact_me);
router.get("/:id", getContact_meById);


module.exports = router;
