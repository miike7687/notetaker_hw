// Dependencies
var express = require("express");
var fs = require("fs");
var app = express();
var PORT = 4000;
var path = require("path");

// Middleware activation
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Get API notes - reading the JSON file and returning it in json format
app.get("/api/notes", function (req, res) {
  notesInfo = fs.readFileSync("./develop/db/db.json", "utf8");
  console.log(notesInfo);
  notesInfo = JSON.parse(notesInfo);
  res.json(notesInfo);
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  console.log(newNote);
  res.json(newNote);
});

//   try {

//   //   notesInfo = fs.readFileSync("./develop/db/db.json", "utf8");
//   //   notesInfo = JSON.parse(notesData);
//   //   req.body.id = notesInfo.length;
//   //   notesInfo.push(req.body);
//   //   notesInfo = JSON.stringify(notesInfo);
//   //   console.log(notesInfo);
//   //   fs.writeFile("./develop/db/db.json", notesInfo, "utf8", function (err) {
//   //     if (err) {
//   //       console.log(err);
//   //       throw err;
//   //     }
//   //   });
//   //   res.json(JSON.parse(notesInfo));
//   // } catch (err) {
//   //   console.log(err);
//   //   throw err;
//   // }
// });

// Listen to the app and console log the url when the app is run
app.listen(PORT, function () {
  console.log("App is listening on http://localhost:" + PORT);
});
