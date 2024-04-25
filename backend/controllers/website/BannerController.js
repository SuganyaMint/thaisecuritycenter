const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/banner/");
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

const getBanner = async (req, res) => {
  try {
    const result = await prisma.banner.findMany();
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

const createBanner = async (req, res) => {
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
        const result = await prisma.banner.create({
          data: {
            image: req.file.originalname,
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
const updateBanner = async (req, res) => {
  try {
    let status = req.body.status;
    const result = await prisma.banner.updateMany({
      data: {
        status: parseInt(status),
      },
    });
    if (result) {
      res.json({
        status: true,
        message: "Success",
      });
    } else {
      res.json({
        status: false,
        message: "Update failed",
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
const deleteBanner = async (req, res) => {
  try {
    const getBanner = await prisma.banner.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    const result = await prisma.banner.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const path = getBanner.link;
    fs.unlinkSync(path);
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

const getBannerImage = async (req, res) => {
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

const updatePictureBanner = async (req, res) => {
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
        let link = req.file.path;
        let image = req.file.originalname;

        const response = await prisma.banner.findUnique({
          where: {
            id: id,
          },
        });
        fs.unlinkSync(response.link);

        const result = await prisma.banner.update({
          where: {
            id: id,
          },
          data: {
            image: image,
            link: link,
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
      message: "Update failed",
    });
  }
};
module.exports = {
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  getBannerImage,
  updatePictureBanner,
};
