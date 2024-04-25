const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/logo/");
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

const getLogo = async (req, res) => {
  try {
    const result = await prisma.cp_logo.findMany();
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
const getLogoByStatus = async (req, res) => {
  try {
    const result = await prisma.cp_logo.findMany({
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
const createLogo = async (req, res) => {
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
        const result = await prisma.cp_logo.create({
          data: {
            image: req.file.filename,
            link: req.file.path,
            status: parseInt(req.body.status),
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
const updateLogo = async (req, res) => {
  try {
    let notActive = 0;
    const result = await prisma.cp_logo.findMany({
      where: {
        status: notActive,
      },
    });
    if (result) {
      const data = await prisma.cp_logo.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          status: parseInt(req.body.status),
        },
      });
      res.json({
        status: true,
        message: "Success",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};
const deleteLogo = async (req, res) => {
  try {
    const result = await prisma.cp_logo.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const path = result.link;
    fs.unlinkSync(path);
    res.json({
      status: true,
      message: "Success",
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

const getLogoImage = async (req, res) => {
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

module.exports = {
  getLogo,
  getLogoByStatus,
  createLogo,
  updateLogo,
  deleteLogo,
  getLogoImage
};
