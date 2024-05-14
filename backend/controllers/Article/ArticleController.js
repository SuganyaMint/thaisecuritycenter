const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/article/");
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

const getArticleImage = async (req, res) => {
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

const createArticle = async (req, res) => {
  try {
    const {
      module,
      module_cat,
      topic,
      page_name,
      description,
      detail,
      keywords,
      sender,
      member_id,
      ip,
      visited,
      picture,
      published,
      hilight,
      link,
    } = req.body;
    const article_id = "ART" + moment().format("YYYYMMDDHHmmss");
    const article = await prisma.article.create({
      data: {
        article_id,
        module,
        module_cat,
        topic,
        page_name,
        description,
        detail,
        keywords,
        sender,
        member_id,
        ip,
        visited,
        picture,
        published,
        hilight,
        link,
      },
    });
    if (article) {
      res.json({
        status: true,
        message: "Success",
        data: article,
      });
    } else {
      res.json({
        status: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const getArticle = async (req, res) => {
  try {
    const article = await prisma.article.findMany({
      orderBy: {
        id: "desc",
      },
    });
    if (article) {
      res.json({
        status: true,
        message: "Success",
        data: article,
      });
    } else {
      res.json({
        status: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const getArticleByID = async (req, res) => {
  try {
    const { article_id } = req.params;
    const article = await prisma.article.findUnique({
      where: {
        article_id,
      },
    });
    if (article) {
      res.json({
        status: true,
        message: "Success",
        data: article,
      });
    } else {
      res.json({
        status: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const getArticle = await prisma.article.findUnique({
      where: {
        article_id,
      },
    });

    const path = getArticle.link;
    fs.unlinkSync(path);

    const article = await prisma.article.delete({
      where: {
        article_id,
      },
    });
    if (article) {
      res.json({
        status: true,
        message: "Success",
        data: article,
      });
    } else {
      res.json({
        status: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const {
      module,
      module_cat,
      topic,
      page_name,
      description,
      detail,
      keywords,
      sender,
      member_id,
      ip,
      visited,
      published,
      hilight,
    } = req.body;
    const article = await prisma.article.update({
      where: {
        article_id,
      },
      data: {
        module,
        module_cat,
        topic,
        page_name,
        description,
        detail,
        keywords,
        sender,
        member_id,
        ip,
        visited,
        published,
        hilight,
      },
    });
    if (article) {
      res.json({
        status: true,
        message: "Success",
        data: article,
      });
    } else {
      res.json({
        status: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const updateImageArticle = async (req, res) => {
  try {
    let article_id = parseInt(req.params.article_id);

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

        const response = await prisma.article.findUnique({
          where: {
            article_id: article_id,
          },
        });
        fs.unlinkSync(response.link);

        const result = await prisma.article.update({
          where: {
            id: id,
          },
          data: {
            picture: image,
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

const getNewsShowsItems = async (req, res) => {

  try {
    const take = parseInt(req.params.take);
    const news = await prisma.article.findMany({
      take: take,
      orderBy: {
        id: "desc",
      },
    });
    if (news) {
      res.json({
        status: true,
        message: "Success",
        data: news,
      });
    } else {
      res.json({
        status: false,
        message: "Failed",
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

const toptennews = async (req, res) => {
  try {
    const news = await prisma.article.findMany({
      take: 10,
      orderBy: {
        visited: "desc",
      },
      where: {
        published: 1,
        module: "knowledge",
      },
    });
    if (news) {
      res.json({
        status: true,
        message: "Success",
        data: news,
      });
    } else {
      res.json({
        status: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};
module.exports = {
  createArticle,
  getArticle,
  getArticleByID,
  deleteArticle,
  updateArticle,
  updateImageArticle,
  getArticleImage,
  getNewsShowsItems,
  toptennews,
};
