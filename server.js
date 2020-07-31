// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 4000;

// Middleware activation
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get API notes - reading the JSON file and returning it in json format
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    let note = JSON.parse(data);
    res.json(note);
    console.log(note);
  });
});

app.post("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (err, database) {
    if (err) throw err;

    database = JSON.parse(database);

    var newNote = req.body;
    const lastElementID = database[database.length - 1].id;
    newNote.id = lastElementID + 1;
    database.push(newNote);
    console.log(newNote);
    database = JSON.stringify(database);
    fs.writeFileSync("db/db.json", database, function (err) {
      if (err) throw err;
      res.sendStatus(200);
    });
    // newNote.id = uuid();

    // res.json(savedNotes);
  });
});

app.delete("/api/notes/:id", function (req, res) {
  const id = parseInt(req.params.id);

  fs.readFile("db/db.json", "utf8", function (err, database) {
    if (err) throw err;
    database = JSON.parse(database);
    var newDatabase = database.filter((note) => {
      return note.id !== id;
    });
    newDatabase = JSON.stringify(newDatabase);
    fs.writeFile("db/db.json", newDatabase, function (err) {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
  console.log("App is listening on http://localhost:" + PORT);
});

// app.delete("/api/notes/:id", function (req, res) {
//   var note = req.params.id;
// });

//     // fs.writeFile("./db/db.json", function (err, data) {
//     //   var note = JSON.parse(data);
//     //   res.json(note);
//   });
// });
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
