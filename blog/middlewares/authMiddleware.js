// authMiddleware.js
const jwt = require("jsonwebtoken");

const isAuthenticatedWithJWT = (req, res, next) => {
  const token = req.session.jwtToken;

  if (token) {
    jwt.verify(token, "votre-secret", (err, user) => {
      if (err) {
        return res.redirect("/login");
      }
      req.user = user;
      return next();
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = isAuthenticatedWithJWT;
