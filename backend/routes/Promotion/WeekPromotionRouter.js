const express = require("express");
const router = express.Router();

const WeekPromotionController = require("../../controllers/Promotion/WeekPromotionController");

router.get("/", WeekPromotionController.getWeekPromotion);
router.post("/", WeekPromotionController.createWeekPromotion);
router.put("/:id", WeekPromotionController.EditWeekPromotion);
router.post("/image", WeekPromotionController.getWeekPromotionImage);
router.post("/items", WeekPromotionController.addItemInWeekPromotion);
router.get(
  "/items/:group_id",
  WeekPromotionController.getWeekPromotionByGroup_id
);
router.post(
  "/items/updatestatus",
  WeekPromotionController.updateStatusWeekPromotion
);
router.post("/items/edit/all", WeekPromotionController.editItemInWeekPromotion);
router.delete("/items/:id", WeekPromotionController.deleteItemInWeekPromotion); //deleteHotpack
router.delete("/:id", WeekPromotionController.deleteWeekPromotion);
router.put("/picture/:id", WeekPromotionController.updatePictureWeekPromotion);

module.exports = router;
