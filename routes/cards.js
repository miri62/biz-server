const express = require("express");
const joi = require("joi");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const router = express.Router();

const cardSchema = joi.object({
  name: joi.string().required().min(2),
  Description: joi.string().required(),
  Address: joi.string().required(),
  phone: joi.number().required(),
  image: joi.string().required(),
  userId: joi.string(),
});

router.post("/", auth, async (req, res) => {
  try {
    // check if user bizz
    if (!req.payload.isBussines)
      return res.status(400).send("Access denied. No isBussines permission");

    // joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send({ error });

    // create new card and save in db

    let card = new Card({ ...req.body, userId: req.payload._id });
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:userId", auth, async (req, res) => {
  try {
    let card = await Card.find({ userId: req.params.userId });
    if (!card) return res.status(404).send("No such card");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:cardId", auth, async (req, res) => {
  try {
    // check if user bizz
    if (!req.payload.isBussines)
      return res.status(400).send("Access denied. No bizz permission");

    // joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send("Wrong body");

    // find the card and update it
    let card = await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      req.body,
      { new: true }
    );

    if (!card) return res.status(404).send("No such card");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:cardId", auth, async (req, res) => {
  try {
    if (!req.payload.isBussines)
      return res.status(400).send("Access denied. No admin permission");
    let card = await Card.findOneAndRemove({ _id: req.params.cardId });
    // let card = await Card.findById(req.params.cardId);
    if (!card) return res.status(404).send("No such card");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
