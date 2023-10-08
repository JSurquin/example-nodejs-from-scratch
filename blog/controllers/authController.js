const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/adminModel");

// Fonction pour initialiser Passport

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("username", username);
    console.log("password", password);
    try {
      const admin = await Admin.findOne({ username: username });
      if (!admin) {
        return done(null, false, { message: "Nom d'utilisateur incorrect" });
      }
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (passwordMatch) {
        return done(null, admin);
      } else {
        return done(null, false, { message: "Mot de passe incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

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

// Middleware pour vérifier si l'utilisateur est authentifié
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

// Contrôleur pour la page de connexion
exports.getLogin = (req, res) => {
  res.render("login");
};

// Contrôleur pour la page d'inscription
exports.getSignup = (req, res) => {
  res.render("signup");
};

// Contrôleur pour le traitement du formulaire de connexion
exports.postLogin = passport.authenticate("local", {
  successRedirect: "/articles",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

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
