const express = require("express");
const router = express.Router();

const LevelPromotionController = require("../../controllers/Promotion/LevelPromotionController");

router.get("/", LevelPromotionController.getLevelPromotion);
router.post("/image", LevelPromotionController.getLevelPromotionImage);
router.post("/", LevelPromotionController.createLevelPromotion);
router.put("/:id", LevelPromotionController.updateLevelPromotion);
router.put("/status/:id", LevelPromotionController.updateStatusLevelPromotion);
router.put("/lock/:id", LevelPromotionController.updateLockLevelPromotion);
router.delete("/:id", LevelPromotionController.deleteLevelPromotion);
router.put("/picture/:id", LevelPromotionController.updatePictureLevelPromotion);

router.post("/items", LevelPromotionController.addItemInLVpromotion);
router.get("/items/:group_id", LevelPromotionController.getLVpromotionByGroup_id);
router.post("/items/edit/all", LevelPromotionController.editItemInLVpromotion);
router.delete("/items/:id", LevelPromotionController.deleteItemInLVpromotion); 

module.exports = router;