const { Users } = require("../database/models/user.model");
const { Books } = require("../database/models/books.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    res.send({ success: false, message: "User already existed" });
  } else {
    const hashPassword = await bcrypt.hash(req.body.password.trim(), 10);
    const newUser = new Users({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: hashPassword.trim(),
    });
    newUser
      .save()
      .then((user) =>
        res.send({ success: true, message: "Account created successfully" })
      )
      .catch((err) =>
        res.send({
          success: false,
          message:
            "something went wrong while creating, please try again after some time",
        })
      );
  }
};

const login = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    res.send({ success: false, message: "user doesn't exists" });
  } else {
    const validPassword = bcrypt.compareSync(
      req.body.password.trim(),
      user.password,
      () => console.log("comparing completed")
    );
    console.log(validPassword);
    if (!validPassword) {
      res.send({ success: false, message: "incorrect password" });
    } else {
      const token = jwt.sign({ name: user.name }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ success: true });
    }
  }
};

const books = async (req, res, next) => {
  Books.find()
    .then((result) => res.send({ success: true, message: result }))
    .catch((err) => res.send({ success: false, message: err }));
};
module.exports = {
  register,
  login,
  books,
};
