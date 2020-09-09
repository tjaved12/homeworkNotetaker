var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3060;
//const PORT = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const note = [{
  title: "",
  text: "",


}, ]
var id = note.title
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));

});

app.delete("/notes/" + id, function (req, res) {
  res.delete

});
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", function (err, data) {
    if (err) {
      return console.log(err);
    }

    console.log("Success!", JSON.parse(data));

    res.json(JSON.parse(data))


  })
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  note.push(newNote);
  res.json(newNote)
  fs.writeFileSync("db/db.json", JSON.stringify([newNote]), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Success!")

  })
});



app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));

});
app.listen(PORT, function () {
  console.log("App listening on localhost: " + PORT);
});