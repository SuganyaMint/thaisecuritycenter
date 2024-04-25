const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/slider/");
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

const getSlider = async (req, res) => {
  try {
    const result = await prisma.cp_slider.findMany();
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
const getSliderByStatus = async (req, res) => {
  try {
    const result = await prisma.cp_slider.findMany({
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
const getSliderById = async (req, res) => {
  try {
    const result = await prisma.cp_slider.findUnique({
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
const createSlider = async (req, res) => {
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
        const result = await prisma.cp_slider.create({
          data: {
            image: req.file.filename,
            link: req.file.path,
            linkAction: req.body.linkAction,
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
const updateSlider = async (req, res) => {
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
        const result = await prisma.cp_slider.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            image: req.file.filename,
            link: req.file.path,
            linkAction: req.body.linkAction,
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
const deleteSlider = async (req, res) => {
  try {
    const result = await prisma.cp_slider.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    fs.unlinkSync(result.link);
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

const getSliderImage = async (req, res) => {
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
const updateStatusSlider = async (req, res) => {
  try {
    const result = await prisma.cp_slider.update({
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
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateLinkAction = async (req, res) => {
  try {
    const result = await prisma.cp_slider.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        linkAction: req.body.linkAction,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateSliderImage = async (req, res) => {
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
        const response = await prisma.cp_slider.findUnique({
          where: {
            id: parseInt(req.params.id),
          },
        });
        fs.unlinkSync(response.link);

        const result = await prisma.cp_slider.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            image: req.file.originalname,
            link: req.file.path,
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
  getSlider,
  getSliderByStatus,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider,
  getSliderImage,
  updateStatusSlider,
  updateLinkAction,
  updateSliderImage,
};
