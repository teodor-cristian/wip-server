const express = require("express");
const app = express();
const cors = require('cors');

const port = 9090;

app.use(cors());
app.use(require('./routes/posts'))

app.listen(port, () => {
  console.log(`Server is on port 9090`);
});