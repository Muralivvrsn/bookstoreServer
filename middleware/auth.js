const jwt = require("jsonwebtoken");

const verification = async (req, res, next) => {
  const token = req.cookies.token;

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
    }
    next();
  });
};

module.exports = verification;
