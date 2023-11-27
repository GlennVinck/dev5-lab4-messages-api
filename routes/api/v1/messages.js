//require express
const express = require("express");
//create router
const router = express.Router();

//connect mongoose and make schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  id: Number,
  user: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

router.get("/", (req, res) => {
  let user = req.query.user;

  if (user) {
    res.json({
      status: "success",
      message: `GETTING message for username ${user}`,
    });
  } else {
    res.json({
      status: "success",
      message: "GETTING messages",
      data: {
        messages: [
          {
            id: 1,
            user: "John Doe",
            message: "Hello World",
          },
          {
            id: 2,
            user: "Jane Doe",
            message: "Hello John",
          },
        ],
      },
    });
  }
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  res.json({
    status: "success",
    message: `GETTING message with id ${id}`,
    data: {
      message: {
        user: "John Doe",
        message: "Hello World",
      },
    },
  });
});

router.post("/", (req, res) => {
  let user = req.body.message.user;

  res.json({
    status: "success",
    message: `POSTING a new message for user ${user}`,
  });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  res.json({
    status: "success",
    message: `UPDATING a message with id ${id}`,
  });
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  res.json({
    status: "success",
    message: `DELETING a message with id ${id}`,
  });
});

module.exports = router;
