const express = require("express");
const router = express.Router();

const {
    createArticle,
    getArticle,
    getArticleByID,
    deleteArticle,
    updateArticle,
    updateImageArticle,
    getArticleImage,
    getNewsShowsItems,
    toptennews
} = require("../../controllers/Article/ArticleController");

router.post("/", createArticle);
router.get("/", getArticle);
router.get("/:article_id", getArticleByID);
router.delete("/:article_id", deleteArticle);
router.put("/:article_id", updateArticle);
router.put("/image/:article_id", updateImageArticle);
router.post("/image", getArticleImage);
router.get("/news/items/:take", getNewsShowsItems);
router.get("/news/topten", toptennews);






module.exports = router;
