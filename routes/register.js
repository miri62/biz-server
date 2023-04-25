const express = require("express");
const joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const registerSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().email().min(6),
  password: joi.string().required().min(8),
  isBussines: joi.boolean(),
});
router.post("/", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");
    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email,isBussines:user.isBussines },
      process.env.JWTKEY
    );

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
