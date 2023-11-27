//require express
const express = require("express");
//create router
const router = express.Router();

router.get("/", (req, res) => {
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

// router.get("/?user=username", (req, res) => {
//     let message = req.params.username;
//     res.json({
//         status: 'success',
//         message: `GET message with username ${message}`,
//     })
//     })

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
