const mongoose = require("mongoose");


const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

// Define User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [BooksSchema],
});

const Users = mongoose.model("User", UserSchema);

module.exports = { Users };
