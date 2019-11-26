const mysql2 = require('mysql2');
let con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "boozingo"
});

module.exports.con = con;

module.exports.connect = function() {
  con.connect();
}