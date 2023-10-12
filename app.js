// Importation des modules nécessaires
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const path = require("path");

// Initialisation de l'application Express
const app = express();
const port = 3000;

// Configuration de la connexion à MongoDB
mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER_URL}/blog?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Configuration de Passport et de la session
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Définition du dossier statique pour les fichiers publics
app.use(express.static(path.join(__dirname, "public")));

// Activation du module flash pour afficher des messages temporaires
app.use(flash());

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration du moteur de vue Pug
app.set("view engine", "pug");
app.use(express.static("public"));
app.set("views", "./blog/views");

// Importation des routes
const homeRoutes = require("./blog/routes/homeRoute.js");
const articleRoutes = require("./blog/routes/articleRoutes.js");
const authRoutes = require("./blog/routes/authRoutes.js");

// Utilisation des routes dans l'application
app.use("/", homeRoutes);
app.use("/articles", articleRoutes);
app.use("/auth", authRoutes);

// Lancement du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le blog est accessible sur http://localhost:${port}`);
});
