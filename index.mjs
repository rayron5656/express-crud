import express from "express";
import bodyParser from "body-parser";
import {MongoClient} from "mongodb";


import {fileURLToPath} from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));



async function ConnectToDB() {
  try{

    const client = await MongoClient.connect("mongodb://localhost:27017/");
    console.log('Connected to db')
    let db = await client.db("quotes");
    return db;
  } catch(err) {
    console.log('error ',err);
  }
}

async function main(db) {
  const myMongoDb = await ConnectToDB(); 
  console.log(myMongoDb);

  const myCollection = myMongoDb.collection("idioms");

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.get("/", async (req, res) => {
    const idioms = await myCollection.find({}).toArray();

    
    res.render('index',{quotes: idioms});
  });

  app.post('/quotes', async (req,res) => { 
   console.log(req.body);
   await myCollection.insertOne(req.body);
   res.redirect('/');
  });

  app.put('/quotes', async (req,res) => {
    await myCollection.findOneAndUpdate(
      {name: 'asd'}, 
      {$set: {
                quote: req.body.quote,
                name: req.body.name
              }
              
      },
      {upsert: true}
      );
  })

  app.delete('/quotes', async (req,res) => {
    await myCollection.deleteOne({name:   req.body.name});
  })

  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

main();







