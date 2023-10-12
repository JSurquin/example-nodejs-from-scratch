const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// Fonction pour initialiser Passport

exports.postLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });

    if (!admin) {
      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (passwordMatch) {
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        "votre-secret"
      );
      req.session.jwtToken = token;
      console.log("mon token", token);
      return res.redirect("/articles");
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

// Fonctions de sérialisation et désérialisation de l'utilisateur pour Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const admin = await Admin.findById(id);
    done(null, admin);
  } catch (error) {
    done(error);
  }
});

// Contrôleur pour la page de connexion
exports.getLogin = (req, res) => {
  res.render("login");
};

// Contrôleur pour la page d'inscription
exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postSignup = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/signup",
  failureFlash: true,
});

// Contrôleur pour la déconnexion
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
