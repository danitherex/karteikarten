const express = require("express");
const MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;

const path = require("path");
const dbName = "karteikarten";
const mongoUri = `mongodb+srv://WebEng:TINF21AI2@karteikarten.fkotr.mongodb.net/${dbName}`;
const collectionName = "karten";
const PORT = process.env.PORT || 3001;

// bullshiet
async function main() {

  const app = express();

  app.use(express.json());


  app.use(express.static(path.resolve(__dirname, '../client/build')));


  let client;
  try {
    client = await MongoClient.connect(mongoUri, {
      useUnifiedTopology: true
    });
    console.log("Connected to database");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);


    app.get("/api/items", async (req, res) => {
      try {
        const result = await collection.find().toArray();
        console.log(result);

        res.json(result[0]);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });

    app.get("/api/items/:itemId", async (req, res) => {
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

    app.post("/api/items", async (req, res) => {
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

    app.put("/api/items/:itemId", (req, res) => {

      try {
        const id = req.params.itemId;
        console.log(`Received PUT for item ${id}`);
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(id);
        const data = req.body;
        collection.updateOne({
          _id: o_id
        }, {
          $set: data
        });

        const result = collection.find({
          _id: o_id
        }).toArray();
        console.log(result);
        res.status(204).end();
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });

    app.delete("/api/items/:itemId", async (req, res) => {
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