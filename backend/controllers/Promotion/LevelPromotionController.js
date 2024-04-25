const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/promotion/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const getLevelPromotion = async (req, res) => {
  try {
    const LevelPromotion = await prisma.cp_level_promotion.findMany();
    res.json({
      status: true,
      message: "Get hotpack success",
      data: LevelPromotion,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Get Level Promotion failed",
    });
  }
};

const getLevelPromotionImage = async (req, res) => {
  try {
    let imageName = req.body.filename;
    let imagePathPattern = path.join(__dirname, `../../${imageName}`);

    glob(imagePathPattern, (err, files) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
        return;
      }

      if (files.length === 0) {
        res.json({
          status: false,
          message: "Image not found",
        });
        return;
      }
      res.sendFile(files[0]);
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const createLevelPromotion = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.json({
          status: false,
          message: "Error",
          error: err.message,
        });
      } else {
        let group_id = moment().format("YYYYMMDDHHmmss");
        let level = req.body.level;
        let image = req.file.path;
        let expiry = req.body.expiry;
        let title = req.body.title;
        let amount = parseInt(req.body.amount);
        let status = parseInt(req.body.status);
        let discount = parseFloat(req.body.discount);
        const result = await prisma.cp_level_promotion.create({
          data: {
            level: parseInt(level),
            title: title,
            image: image,
            expiry: expiry,
            amount: amount,
            status: status,
            group_id: group_id,
            discount: discount,
          },
        });
        res.json({
          status: true,
          message: "Success",
          data: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Create hotpack failed",
    });
  }
};

const updateLevelPromotion = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let level = req.body.level;
    let expiry = req.body.expiry;
    let title = req.body.title;
    let amount = parseInt(req.body.amount);
    let discount = parseFloat(req.body.discount);
    const result = await prisma.cp_level_promotion.update({
      where: {
        id: id,
      },
      data: {
        level: parseInt(level),
        title: title,
        expiry: expiry,
        amount: amount,
        discount: discount,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Create hotpack failed",
    });
  }
};
const updatePictureLevelPromotion = async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.json({
          status: false,
          message: "Error",
          error: err.message,
        });
      } else {
        let image = req.file.path;

        const response = await prisma.cp_level_promotion.findUnique({
          where: {
            id: id,
          },
        });

        fs.unlinkSync(response.image);

        const result = await prisma.cp_level_promotion.update({
          where: {
            id: id,
          },
          data: {
            image: image,
          },
        });
        res.json({
          status: true,
          message: "Success",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Create hotpack failed",
    });
  }
};

const deleteLevelPromotion = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const result = await prisma.cp_level_promotion.delete({
      where: {
        id: id,
      },
    });
    fs.unlinkSync(result.image);
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Delete hotpack failed",
    });
  }
};

const updateStatusLevelPromotion = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let status = parseInt(req.body.status);
    const result = await prisma.cp_level_promotion.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Update hotpack failed",
    });
  }
};

const updateLockLevelPromotion = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let lock = parseInt(req.body.lock);
    const result = await prisma.cp_level_promotion.update({
      where: {
        id: id,
      },
      data: {
        lock: lock,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Update hotpack failed",
    });
  }
};

//About Items in promotion

const addItemInLVpromotion = async (req, res) => {
  try {
    let { group_id, items } = req.body;
    const getAll = await prisma.cp_level_promotion_group.findMany({
      where: {
        group_id: group_id,
      },
    });
    let index = parseInt(getAll.length + 1);
    items.map(async (item, i) => {
      let result = await prisma.cp_level_promotion_group.create({
        data: {
          group_id: group_id,
          item_id: String(item.item_id),
          item_desc: item.Description,
          item_amount: parseInt(item.Amount),
        },
      });
    });

    res.json({
      status: true,
      message: "Success",
      // data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Add items in level promotion  failed",
    });
  }
};

const getLVpromotionByGroup_id = async (req, res) => {
  try {
    let { group_id } = req.params;
    const result = await prisma.cp_level_promotion_group.findMany({
      where: {
        group_id: group_id,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Get items in level promotion  by group_id failed",
    });
  }
};

const editItemInLVpromotion = async (req, res) => {
  try {
    let { id, item_desc, item_amount, item_id } = req.body;
    const result = await prisma.cp_level_promotion_group.update({
      where: {
        id: parseInt(id),
      },
      data: {
        item_amount: parseInt(item_amount),
        item_desc: item_desc,
        item_id: String(item_id),
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Update  items in level promotion  failed",
    });
  }
};
const deleteItemInLVpromotion = async (req, res) => {
  // console.log(req.params);
  try {
    let { id } = req.params;
    const result = await prisma.cp_level_promotion_group.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Delete  items in level promotion failed",
    });
  }
};
module.exports = {
  getLevelPromotion,
  getLevelPromotionImage,
  createLevelPromotion,
  updateLevelPromotion,
  deleteLevelPromotion,
  updateStatusLevelPromotion,
  updateLockLevelPromotion,
  updatePictureLevelPromotion,
  addItemInLVpromotion,
  getLVpromotionByGroup_id,
  editItemInLVpromotion,
  deleteItemInLVpromotion,
};
