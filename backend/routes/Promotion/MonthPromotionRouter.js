const express = require("express");
const router = express.Router();

const MonthPromotionController = require("../../controllers/Promotion/MonthPromotionController");

router.get("/", MonthPromotionController.getMonthPromotion);
router.post("/", MonthPromotionController.createMonthPromotion);
router.put("/:id", MonthPromotionController.EditMonthPromotion);
router.post("/image", MonthPromotionController.getMonthPromotionImage);
router.post("/items", MonthPromotionController.addItemInMonthPromotion);
router.get(
  "/items/:group_id",
  MonthPromotionController.getMonthPromotionByGroup_id
);
router.post(
  "/items/updatestatus",
  MonthPromotionController.updateStatusMonthPromotion
);
router.post(
  "/items/edit/all",
  MonthPromotionController.editItemInMonthPromotion
);
router.delete(
  "/items/:id",
  MonthPromotionController.deleteItemInMonthPromotion
);
router.delete("/:id", MonthPromotionController.deleteMonthPromotion);
router.put(
  "/picture/:id",
  MonthPromotionController.updatePictureMonthPromotion
);

module.exports = router;
