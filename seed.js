const mysql = require("mysql2");

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

db.query(
  'INSERT INTO `commentdata` (content) VALUES ("That\'s crazy ngl"), ("Wow.. Great work  !!"), ("Yeah, thanks, no wonder why I can\'t ever get a good pair of Jordan\'s"), ("i cant imagine hm ppl are gonna try to take up botting after this video and lose $ lol"), ("Who else is thinking about buying sneakers now?"), ("I buy 99% of my clothing online thrifts.")'
);
