const express = require("express");
const app = express();
const port = 3000;

// enable CORS
const cors = require("cors");

//include routes
//const logger = require('./middleware/logger');
const messagesRouter = require("./routes/api/v1/messages.js");

//json body parser
app.use(express.json());
app.use(cors());
app.use("/api/v1/messages", messagesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
