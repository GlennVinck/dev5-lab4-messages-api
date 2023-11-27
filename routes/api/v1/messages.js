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

// GET route for retrieving messages
router.get("/:id?", (req, res) => {
  const id = req.params.id;
  const user = req.query.user;

  if (id) {
    // If there's an "id" parameter, retrieve a single message from MongoDB
    Message.findById(id)
      .exec()
      .then((message) => {
        res.json({
          status: "success",
          message: `GETTING message with id ${id}`,
          data: {
            message,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          status: "error",
          message: "Error retrieving the message",
        });
      });
  } else if (user) {
    // If there's a "user" query parameter, retrieve messages for that user from MongoDB
    Message.find({ user })
      .exec()
      .then((messages) => {
        res.json({
          status: "success",
          message: `GETTING messages for username ${user}`,
          data: {
            messages,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          status: "error",
          message: "Error retrieving messages for the user",
        });
      });
  } else {
    // If there's no "id" or "user" parameter, retrieve all messages from MongoDB
    Message.find({})
      .exec()
      .then((messages) => {
        res.json({
          status: "success",
          message: "GETTING messages",
          data: {
            messages,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          status: "error",
          message: "Error retrieving messages",
        });
      });
  }
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
  const id = req.params.id;
  const updatedMessage = {
    user: req.body.message.user,
    message: req.body.message.message,
  };

  Message.findByIdAndUpdate(id, updatedMessage, { new: true })
    .exec()
    .then((updatedDoc) => {
      if (updatedDoc) {
        res.json({
          status: "success",
          message: `UPDATING a message with id ${id}`,
          data: updatedDoc,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Message with id ${id} not found`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Error updating the message",
      });
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
