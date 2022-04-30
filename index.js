const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log('hey ');
  res.sendFile( __dirname + "/index.html");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

