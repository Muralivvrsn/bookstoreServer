const { Users } = require("../database/models/user.model");
const { Books } = require("../database/models/books.model");
const mongoose = require("mongoose");
const isBookExist = async (id, title) => {
  console.log(id);
  const user = await Users.findById(id)
    .then((res) => {
      return res;
    })
    .catch((err) =>
      res.send({ success: false, message: "wrong while finding book" })
    );
  const books = user.books;
  return books.some((book) => book.title === title);
};

const addBook = async (req, res, next) => {
  if (await isBookExist(req.params.id, req.body.title)) {
    return res.send({ success: false, message: "Book Already existed" });
  }
  const book = new Books({
    title: req.body.title,
    author: req.body.author,
  });
  const newBook = {
    _id: book._id,
    title: req.body.title,
    author: req.body.author,
  };
  const user = await Users.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { books: newBook } },
    { new: true }
  );
  book.save();
  user.save();
  res.send({ success: true, message: "new Book added" });
};

const deleteBook = async (req, res, next) => {
  const user = await Users.findById(req.params.user)
    .then((result) => {
      return result;
    })
    .catch((err) =>
      res.send({ success: false, message: "error while getting user" })
    );
  const booksList = user.books;
  if (!booksList.some((book) => book._id.toString() === req.params.id)) {
    return res.send({ success: false, message: "It is not your book" });
  }
  const books = await Books.findOneAndDelete({ _id: req.params.id });
  books.save();
  Users.findOneAndUpdate(
    { _id: req.params.user },
    { $pull: { books: { _id: req.params.id } } },
    { new: true }
  )
    .then((user) => res.send({ success: true, message: user.books }))
    .catch((err) =>
      res.send({ success: false, message: "Error while deleting" })
    );
};

module.exports = {
  addBook,
  deleteBook,
};
