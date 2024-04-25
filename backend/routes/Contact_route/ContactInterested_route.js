const express = require("express");
const router = express.Router();

const {
    createContact_In,
    getContact_In,
    getContact_InById,
    deleteContact_In
} = require("../../controllers/Contact/ContactInterestedController");

router.post("/", createContact_In);
router.get("/", getContact_In);
router.get("/:id", getContact_InById);
router.delete("/:id", deleteContact_In);


module.exports = router;
