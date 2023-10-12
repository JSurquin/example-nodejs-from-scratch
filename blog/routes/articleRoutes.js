const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Importez votre modèle d'article MongoDB ici
const Article = require("../models/articleModel");
const isAuthenticatedWithJWT = require("../middlewares/authMiddleware");

// Route pour afficher tous les articles
router.get("/", isAuthenticatedWithJWT, async (req, res) => {
  try {
    const articles = await Article.find();
    res.render("articles/index", { articles });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour afficher le formulaire d'ajout d'article
router.get("/add", isAuthenticatedWithJWT, (req, res) => {
  res.render("articles/add");
});

// Route pour afficher un article individuel
router.get("/:id", isAuthenticatedWithJWT, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render("articles/show", { article });
  } catch (err) {
    console.error(err);
    res.status(404).send("Article non trouvé");
  }
});

// Route pour traiter le formulaire d'ajout d'article
router.post("/add", isAuthenticatedWithJWT, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newArticle = new Article({ title, content });
    await newArticle.save();
    res.redirect("/articles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
