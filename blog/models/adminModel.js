const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définir le schéma pour l'admin
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// // Middleware pour hacher le mot de passe avant de sauvegarder dans la base de données
// adminSchema.pre("save", function (next) {
//   const admin = this;

//   // Générer le sel et hacher le mot de passe avec bcrypt
//   bcrypt.genSalt(12, (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     bcrypt.hash(admin.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }

//       admin.password = hash;
//       next();
//     });
//   });
// });

// Créer le modèle 'Admin'
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
