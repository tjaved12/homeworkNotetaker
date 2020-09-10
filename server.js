// Dependencies
// =============================================================var express = require("express");
var express = require("express");
var path = require("path");
var fs = require("fs");
var uniqid = require('uniqid');

// Set up the Express App
// =============================================================
var app = express();
//var PORT = 3060;
var PORT = process.env.PORT || 8080;

app.use(express.static('public'))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//Routes
//===============================================================

//Basic route for AJAX notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));

});
//Posting the notes in JSOn db

app.post("/api/notes", function (req, res) {
  var newNote = {
    id: uniqid(),
    newNote,
    title: req.body.title,
    text: req.body.text
  }

  fs.readFile("db/db.json", function (err, data) {
    var note = JSON.parse(data)
    console.log("data", JSON.parse(data))
    console.log('data raw', data)
    note.push(newNote);
    console.log("note", note)

    fs.writeFile("db/db.json", JSON.stringify(note), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("Success!")
      res.json(note)
    })
  })
});

//Displays all notes
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("Success!", JSON.parse(data));

    res.json(JSON.parse(data))
  })
});
//displays a single note and delete that
app.delete("/api/notes/:id", function (req, res) {
  var savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  var noteID = req.params.id;
  var newID = 0;
  console.log(`Deleting note with ID ${noteID}`);
  saved = savedNote.filter(currentNote => {
    return currentNote.id != noteID;
  })
  for (currentNote of saved) {
    currentNote.id = newID.toString();
    newID++;
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(saved));
  res.json(saved);
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));

});
app.listen(PORT, function () {
  console.log("App listening on localhost: " + PORT);
});