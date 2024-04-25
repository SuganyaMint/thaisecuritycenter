const express = require("express");
const router = express.Router();

const HotpackController = require("../../controllers/Promotion/HotpackController");

router.get("/", HotpackController.getHotpack);
router.post("/", HotpackController.createHotpack);
router.put("/:id", HotpackController.EditHotPack);
router.post("/image", HotpackController.getHotpackImage);
router.post("/items", HotpackController.addItemInHotPack);
router.get("/items/:group_id", HotpackController.getHotpackByGroup_id);
router.post("/items/updatestatus", HotpackController.updateStatusHotPack);
router.post("/items/edit/all", HotpackController.editItemInHotPack);
router.delete("/items/:id", HotpackController.deleteItemInHotPack); //deleteHotpack
router.delete("/:id", HotpackController.deleteHotpack);
router.put("/picture/:id", HotpackController.updatePictureHotPack);

module.exports = router;
