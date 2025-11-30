const usermodel = require("../models/UseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { join } = require("path");

const accesskey = process.env.accesstoken;
const refreshkey = process.env.refreshtoken;

const generateaccesstoken = (user) => {
  return jwt.sign({ id: user._id }, accesskey, { expiresIn: "1h" });
};

const generaterefreshtoken = (user) => {
  return jwt.sign({ id: user._id }, refreshkey, { expiresIn: "7h" });
};

let refreshtokens = [];

/* -------------------------------- CREATE USER -------------------------------- */
exports.createUser = async (req, res) => {
  try {
    const user = new usermodel(req.body);
    await user.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* -------------------------------- GET ALL USERS -------------------------------- */
exports.getalluser = async (req, res) => {
  try {
    const users = await usermodel.find();

    res.status(200).json({
      succes: true,
      message: "Liste des utilisateurs",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Impossible de récupérer les utilisateurs",
      data: null,
    });
  }
};

/* -------------------------------- GET USER BY ID -------------------------------- */
exports.getUserById = async (req, res) => {
  try {
    const user = await usermodel
      .findById(req.params.id)
      .populate("educations")
      .populate("experiences")
      .populate("certification")
      .populate("skill");

    if (!user) {
      return res.status(404).json({
        succes: false,
        message: "Utilisateur non trouvé",
        data: null,
      });
    }

    res.status(200).json({
      succes: true,
      message: "Utilisateur trouvé",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Erreur lors de la récupération de l'utilisateur",
      data: null,
    });
  }
};

/* -------------------------------- UPDATE USER -------------------------------- */
exports.updateUser = async (req, res) => {
  try {
    const user = await usermodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      succes: true,
      message: "Utilisateur mis à jour",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Impossible de mettre à jour l'utilisateur",
      data: null,
    });
  }
};

/* -------------------------------- DELETE USER -------------------------------- */
exports.deleteUser = async (req, res) => {
  try {
    const user = await usermodel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      succes: true,
      message: "Utilisateur supprimé",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Impossible de supprimer l'utilisateur",
      data: null,
    });
  }
};

/* -------------------------------- LOGIN -------------------------------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userdata = await usermodel.findOne({ email: email.trim() });
    if (!userdata) {
      return res.status(400).json({ message: "Email incorrect" });
    }

    const matchingpassword = await bcrypt.compare(
      password.trim(),
      userdata.password
    );
    if (!matchingpassword) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const accesstoken = generateaccesstoken(userdata);
    const refreshtoken = generaterefreshtoken(userdata);
    refreshtokens.push(refreshtoken);

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: userdata,
      accesstoken,
      refreshtoken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      data: null,
    });
  }
};

/* -------------------------------- FORGET PASSWORD (SEND EMAIL) -------------------------------- */
exports.forget = async (req, res) => {
  try {
    const { email } = req.body;

    const userdata = await usermodel.findOne({ email });
    if (!userdata) {
      return res.status(400).json({
        succes: false,
        message: "Email incorrect",
      });
    }

    const token = jwt.sign({ id: userdata._id }, accesskey, {
      expiresIn: "5min",
    });
    await usermodel.findOneAndUpdate({ email }, { token }, { new: true });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farhatyasmine161@gmail.com",
        pass: "tzdf aymn xxwy gvmt",
      },
    });

    const mailOptions = {
      from: "farhatyasmine161@gmail.com",
      to: userdata.email,
      subject: "Réinitialisation du mot de passe",
      html: `<b>Cliquez ici pour réinitialiser votre mot de passe : </b>
        <a href="http://localhost:5173/reset/${token}">Réinitialiser</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      succes: true,
      message: "Email envoyé ✔",
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "Erreur lors de l'envoi de l'email",
      error: error.message,
    });
  }
};

/* -------------------------------- RESET PASSWORD -------------------------------- */
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;

    // Vérification du token
    jwt.verify(token, accesskey);

    // Récupération de l'utilisateur par token
    const user = await usermodel.findOne({ token });
    if (!user) {
      return res.status(400).json({ message: "Token invalide ou expiré" });
    }

    // Hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    user.token = undefined;
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé ✔" });
  } catch (error) {
    res.status(400).json({ message: "Token expiré ou invalide ❌" });
  }
};
exports.verify = async (req, res) => {
  try {
    return res.send("Vérification OK");
  } catch (error) {
    return res.send("Erreur lors de la vérification");
  }
};
exports.changePassword = async (req, res) => {
  return res.send("Change password OK");
};
