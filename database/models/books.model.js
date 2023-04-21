const mongoose = require("mongoose");

// Define Books schema
const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    unique:true
  },
  author: {
    type: String,
    required: true,
  },
});


const Books = mongoose.model("Books", BooksSchema);

module.exports = { Books }