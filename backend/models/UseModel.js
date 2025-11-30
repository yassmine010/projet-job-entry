const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const baseoption = { discriminatorKey: "role", collection: "user" };

const userSchema = new mongoose.Schema(
  {
    FirstName: { type: String },
    LastName: { type: String },
    email: { type: String },
    adresse: { type: String },
    PhoneNumber: { type: Number },
    password: { type: String },
    role: { type: String },
    token: { type: String },
    code: { type: String },
    isverified: { type: Boolean, default: false },

  },
  baseoption
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.password.startsWith("$2a$") || this.password.startsWith("$2b$")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("user", userSchema);
