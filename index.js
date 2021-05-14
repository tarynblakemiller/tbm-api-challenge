const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

const mysql = require("mysql2");

const redis = require("redis");
const redisPort = 6379;
const client = redis.createClient(redisPort);

client.on("error", (err) => {
  console.log(err);
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, the app is running!");
});

app.get("/comments", (req, res) => {
  try {
    client.get("comments", async (err, comments) => {
      if (err) throw err;

      if (comments) {
        res.status(200).send({
          comments: JSON.parse(comments),
          message: "data retrieved from the cache",
        });
      } else {
        db.query("SELECT * FROM commentdata", (err, rows, fields) => {
          client.set("comments", JSON.stringify(rows));
          client.expire("comments", 60);
          res.status(200).json(rows);
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.delete("/comments/:id", (req, res, next) => {
  const commentId = req.params.id;
  try {
    db.query("DELETE FROM commentdata WHERE commentdata.id = ?", [commentId]);
  } catch (err) {
    return res.sendStatus(500).send(err);
  }
  res.sendStatus(200);
});

app.post("/comments", (req, res, next) => {
  const content = req.body.content;
  try {
    db.query(
      "INSERT INTO `commentdata` (content) VALUES (?)",
      content.toString(),
      function (err, result) {
        if (err) throw err;

        console.log("1 record inserted into the database");
      }
    );
  } catch (error) {
    next(error);
  }
  res.send(content);
});

const db = mysql.createConnection({
  host: "localhost",
  database: "comments",
  user: "root",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("Error occurred while attmpeting to connect to the database");
    return;
  } else {
    console.log("Database is connected");
  }
});
global.db = db;

app.listen(PORT, () => console.log("Listening on port 5000..."));
