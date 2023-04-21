const mongoose = require("mongoose");

async function connect() {
  try {
    const db = mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTED");
    return db;
  } catch (err) {
    console.log("NOT CONNECTED");
  }
}
module.exports = {
  connect,
};
