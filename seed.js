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
  'INSERT INTO `commentdata` (content) VALUES ("blah"), ("yeah"), ("whoa")'
);
