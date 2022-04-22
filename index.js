const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is Node with Mongo db Hello node mon");
});

//mongo db

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://hhheranode1:aiCbPTnyniePyJDo@cluster0.6optc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("users");

    //get data from mongodb and serve to the clint site
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //post a data from client side
    app.post("/user", async (req, res) => {
      console.log("body", req.body);
      const newUser = req.body;
      const resutl = await userCollection.insertOne(newUser);
      res.send(resutl);
    });

    // delete user post
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const resutl = await userCollection.deleteOne(query);
      res.send(resutl);
    });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("app listenig successfylly", port);
});
