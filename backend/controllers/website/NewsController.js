const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/news/");
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

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5, // 5 MB, adjust as needed
  },
});

const getNews = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.findMany({
      orderBy: {
        order: "asc",
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
const getNewsByStatus = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.findMany({
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
const getNewsById = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.findUnique({
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

const getNewsByOrder = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.findMany({
      where: {
        order: parseInt(req.params.order),
        status: 1,
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

const createNews = async (req, res) => {
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
        const result = await prisma.cp_news_event.create({
          data: {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            status: parseInt(req.body.status),
            image: req.file.originalname,
            link: req.file.path,
            order: parseInt(req.body.order),
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
const updateNews = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
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
const updateStatusNews = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.update({
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
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};
const updateNewsImage = async (req, res) => {
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
        const response = await prisma.cp_news_event.findUnique({
          where: {
            id: parseInt(req.params.id),
          },
        });
        fs.unlinkSync(response.link);

        const result = await prisma.cp_news_event.update({
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
const deleteNews = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.delete({
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
const getNewsImage = async (req, res) => {
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

const getnewsSix = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.findMany({
      where: {
        status: 1,
      },
      take: 6,
    });
    //sort by order
    result.sort((a, b) => (a.order > b.order ? 1 : -1));

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

const changeOrderNews = async (req, res) => {
  try {
    const result = await prisma.cp_news_event.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        order: parseInt(req.body.order),
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

module.exports = {
  getNews,
  getNewsByStatus,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getNewsImage,
  getnewsSix,
  updateStatusNews,
  updateNewsImage,
  changeOrderNews,
  getNewsByOrder,
};
