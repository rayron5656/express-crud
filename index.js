const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;


const app = express();

mongoClient.connect("mongodb://localhost:27017/", (err, db) => {
  if (err) {
    console.log('error: ',err);
    process.exit(1);

  }
  console.log("connected to mongodb");
});

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  console.log('hey ');
  res.sendFile( __dirname + "/index.html");
});

app.post('/quotes',(req,res) => { 
  console.log(req.body);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

