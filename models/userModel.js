const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be field");
  }

  // check if the email is valid
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  // lowercase, upercase, number, symbol, 8+ chars
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password isn't strong, try to combine lowercase, upercase, number, symbol, 8+ chars"
    );
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already used");
  }

  // encript password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create on user
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be field");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect user");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
