// Dependencies
var express = require("express");
var fs = require("fs");
var app = express();
var PORT = 4000;

app.get("/notes", function (req, res) {});

app.get("*");

// Get API notes - reading the JSON file and returning it in json format
app.get("/api/notes", function (req, res) {
  notesInfo = fs.readFileSync("/develop/db/db.json", "utf8");
  console.log(notesInfo);
  notesInfo = JSON.parse(notesInfo);
  res.json(notesInfo);
});

// Listen to the app and console log the url when the app is run
app.listen(PORT, function () {
  console.log("App is listening on http://localhost:" + PORT);
});
