const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  Description: {
    type: String,
    required:true,
  },
  Address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
});

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
