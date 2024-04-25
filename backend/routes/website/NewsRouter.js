const express = require("express");
const router = express.Router();

const {
  getNews,
  getNewsByStatus,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getNewsImage,
  getnewsSix,
  updateStatusNews,
  updateNewsImage,
  changeOrderNews,
  getNewsByOrder,
} = require("../../controllers/website/NewsController");

router.get("/", getNews);
router.get("/status/:status", getNewsByStatus);
router.get("/order/:order", getNewsByOrder);
router.get("/:id", getNewsById);
router.post("/", createNews);
router.put("/:id", updateNews);
router.put("/image/:id", updateNewsImage);
router.put("/status/:id", updateStatusNews);
router.put("/order/:id", changeOrderNews);
router.delete("/:id", deleteNews);
router.post("/image", getNewsImage);
router.get("/get/six", getnewsSix);

module.exports = router;
