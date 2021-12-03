const express = require("express");
const MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;

const path = require("path");
const dbName = "karteikarten";
const mongoUri = `mongodb+srv://WebEng:<password>@karteikarten.fkotr.mongodb.net/${dbName}`;
const collectionName = "karten";
const PORT = process.env.PORT || 3001;


async function main() {

  const app = express();

  app.use(express.json());


  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get("/api", (req, res) => {
    res.json({
      message: "Hallo Jarred"
    });
  });

  let client;
  try {
    client = await MongoClient.connect(mongoUri, {
      useUnifiedTopology: true
    });
    console.log("Connected to database");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);


    app.get("/items", async (req, res) => {
      try {
        const result = await collection.find().toArray();
        console.log(result);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });

    app.get("/items/:itemId", async (req, res) => {
      try {
        const id = req.params.itemId;
        console.log(`Recieved request for item ${id}`);
        const result = await collection.find({
          "_id": ObjectId(id)
        }).toArray(function (err, results) {
          if (err) throw err;
          console.log(results);
          res.send(results);
        });

      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });

    app.post("/items", async (req, res) => {
      try {
        const data = req.body;
        const result = await collection.insertOne(data);
        const id = result.insertedId; // unique Id from MongoDB
        console.log(`Inserted document ${id}`);
        res.set("Location", `/items/${id}, value ${data}`);
        res.status(201).end();
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });

    app.put("/items/:itemId", async (req, res) => {
      try {
        const id = req.params.itemId;
        const data = JSON.parse(req.body);
        console.log(`Recieved request for item ${id}`);
        const result = await collection.updateOne({
          "_id": ObjectId(id)
        }, data);
        console.log(`Updated id ${id} successfully with ${data}`);
        res.status(204).end();
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });

    app.delete("/items/:itemId", async (req, res) => {
      try {
        const id = req.params.itemId;
        console.log(`Recieved request for item ${id}`);
        const result = await collection.deleteOne({
          "_id": ObjectId(id)
        });
        console.log(`Deleted id ${id} successfully`);
        res.status(204).end();
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);

    });
  } catch (err) {
    console.log(err);
  }
}
main().catch((err) => console.log(err));