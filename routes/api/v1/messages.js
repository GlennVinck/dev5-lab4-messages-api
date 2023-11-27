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
  // Create a new instance of the Message model
  const message = new Message();
  message.message = req.body.message.message;
  message.user = req.body.message.user;

  // throw new MongooseError('Model.prototype.save() no longer accepts a callback');
  // Save the message without a callback
  message
    .save()
    .then((savedMessage) => {
      // Success: Send the response
      res.json({
        status: "success",
        message: `POSTING a new message for user ${message.user}`,
        data: savedMessage,
      });
    })
    .catch((err) => {
      // Handle any errors
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Error saving the message",
      });
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
