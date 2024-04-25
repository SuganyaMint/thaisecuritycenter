const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/button/");
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

const getButton = async (req, res) => {
  try {
    const result = await prisma.cp_button_click.findMany();
    res.json({
      status: true,
      message: "Success",
      data: result,
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
const getButtonByStatus = async (req, res) => {
  try {
    const result = await prisma.cp_button_click.findMany({
      where: {
        status: parseInt(req.params.status),
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
      message: "Error",
      error: error.message,
    });
  }
};
const getButtonById = async (req, res) => {
  try {
    const result = await prisma.cp_button_click.findUnique({
      where: {
        id: parseInt(req.params.id),
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
      message: "Error",
      error: error.message,
    });
  }
};
const createButton = async (req, res) => {
  try {
    let button_id = moment().format("YYYYMMDDHHmmss");
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.json({
          status: false,
          message: "Error",
          error: err.message,
        });
      } else {
        const result = await prisma.cp_button_click.create({
          data: {
            button_id: button_id,
            text: req.body.text,
            image: req.file.path,
            link: req.body.link,
            status: 0,
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
      message: "Error",
      error: error.message,
    });
  }
};
const updateButton = async (req, res) => {
  try {
    if (parseInt(req.body.status) === 1)
    {
      const TitleStatus = await prisma.cp_button_click.updateMany({
        where: {
          status: 1,
        },
        data: {
          status: 0,
        },
      });
    }
    const result = await prisma.cp_button_click.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        text: req.body.text,
        link: req.body.link,
        status: parseInt(req.body.status),
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
      message: "Error",
      error: error.message,
    });
  }
};
const deleteButton = async (req, res) => {
  try {
    const result = await prisma.cp_button_click.delete({
      where: {
        id: parseInt(req.params.id),
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
      message: "Error",
      error: error.message,
    });
  }
};

const getButtonImage = async (req, res) => {
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
        res.status(404).json({ error: "Image not found" });
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

const updateButtonImage = async (req, res) => {
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
        const response = await prisma.cp_button_click.findUnique({
          where: {
            id: parseInt(req.params.id),
          },
        });
        fs.unlinkSync(response.image);

        const result = await prisma.cp_button_click.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            image: req.file.originalname,
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
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = {
  getButton,
  getButtonByStatus,
  getButtonById,
  createButton,
  updateButton,
  deleteButton,
  getButtonImage,
  updateButtonImage,
};
