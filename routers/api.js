const express = require("express");
const router = express.Router();
const verification = require("../middleware/auth");
const controllers = require("../controllers/controller");
const userControllers = require("../controllers/userControl");

router.post("/add-book/:id", verification, controllers.addBook);
router.delete("/delete-book/:user/:id", verification, controllers.deleteBook);

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);


router.get("/home",verification, userControllers.books);
module.exports = router;
