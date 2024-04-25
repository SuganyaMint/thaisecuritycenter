const express = require("express");
const router = express.Router();

const {
  register_member,
  get_member,
  delete_member,
  updateTypeMember
} = require("../../controllers/Member/RegisterController");

router.post("/", register_member);
router.get("/", get_member);
router.delete("/:id", delete_member);
router.put("/type/:id", updateTypeMember);

module.exports = router;
