const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/promotion/week/");
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

const getWeekPromotion = async (req, res) => {
  try {
    const weekPromotion = await prisma.cp_week_promotion.findMany();
    res.json({
      status: true,
      message: "Get week promotion success",
      data: weekPromotion,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Get week promotionack failed",
    });
  }
};

const getWeekPromotionImage = async (req, res) => {
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

const createWeekPromotion = async (req, res) => {
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
        let title = req.body.title;
        let image = req.file.path;
        let description = req.body.description;
        let limit = parseInt(req.body.limit);
        let reset_limit = parseInt(req.body.reset_limit);
        let price = parseFloat(req.body.price);
        let discount = parseFloat(req.body.discount);
        let pack_no = parseInt(req.body.pack_no);
        let group_id = moment().format("YYYYMMDDHHmmss");
        let status = parseInt(req.body.status);
        const result = await prisma.cp_week_promotion.create({
          data: {
            title: title,
            image: image,
            description: description,
            limit: limit,
            reset_limit: reset_limit,
            price: price,
            discount: discount,
            pack_no: pack_no,
            group_id: group_id,
            status: status,
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
      message: "Create week promotion failed",
    });
  }
};

const addItemInWeekPromotion = async (req, res) => {
  try {
    let { group_id, items } = req.body;
    const getAll = await prisma.cp_week_promotion_group.findMany({
      where: {
        group_id: group_id,
      },
    });
    let index = parseInt(getAll.length + 1);
    items.map(async (item, i) => {
      let result = await prisma.cp_week_promotion_group.create({
        data: {
          group_id: group_id,
          item_id: String(item.item_id),
          item_desc: item.Description,
          amount: parseInt(item.Amount),
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
      message: "Add item in week promotion failed",
    });
  }
};

const getWeekPromotionByGroup_id = async (req, res) => {
  try {
    let { group_id } = req.params;
    const result = await prisma.cp_week_promotion_group.findMany({
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
      message: "Get Week Promotion by group id failed",
    });
  }
};

const updateStatusWeekPromotion = async (req, res) => {
  try {
    let { id, status } = req.body;
    const result = await prisma.cp_week_promotion.update({
      where: {
        id: parseInt(id),
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
      message: "Update status Week Promotion failed",
    });
  }
};

const editItemInWeekPromotion = async (req, res) => {
  try {
    let { id, item_desc, amount , item_id } = req.body;
    const result = await prisma.cp_week_promotion_group.update({
      where: {
        id: parseInt(id),
      },
      data: {
        amount: parseInt(amount),
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
      message: "Update status Week Promotion failed",
    });
  }
};
const deleteItemInWeekPromotion = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await prisma.cp_week_promotion_group.delete({
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
      message: "Update status Week Promotion failed",
    });
  }
};
const EditWeekPromotion = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, limit, reset_limit, price, discount, pack_no } =
      req.body;
    const result = await prisma.cp_week_promotion.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        description: description,
        limit: parseInt(limit),
        reset_limit: parseInt(reset_limit),
        price: parseFloat(price),
        discount: parseFloat(discount),
        pack_no: parseInt(pack_no),
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
      message: "Update status week vpromotion failed",
    });
  }
};
const updatePictureWeekPromotion = async (req, res) => {
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
        const response = await prisma.cp_week_promotion.findUnique({
          where: {
            id: id,
          },
        });

        fs.unlinkSync(response.image);

        let image = req.file.path;
        const result = await prisma.cp_week_promotion.update({
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
      message: "Create week promotion failed",
    });
  }
};

const deleteWeekPromotion = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const result = await prisma.cp_week_promotion.delete({
      where: {
        id: id,
      },
    });
    fs.unlinkSync(result.image);

    const result2 = await prisma.cp_week_promotion_group.deleteMany({
      where: {
        group_id: result.group_id,
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
      message: "Delete week promotion failed",
    });
  }
};

module.exports = {
  getWeekPromotion,
  getWeekPromotionImage,
  createWeekPromotion,
  addItemInWeekPromotion,
  getWeekPromotionByGroup_id,
  updateStatusWeekPromotion,
  editItemInWeekPromotion,
  deleteItemInWeekPromotion,
  EditWeekPromotion,
  updatePictureWeekPromotion,
  deleteWeekPromotion,
};
