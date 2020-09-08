var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3060;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
 

app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", function (err, data) {
         if (err) {
            return console.log(err);
        }
    
        console.log("Success!", JSON.parse(data));

        res.json(JSON.parse(data))
    
   
    })
});

    app.post("/api/notes", function(req, res) {

        
        fs.writeFile("db/db.json",JSON.stringify(req.body) ,function(err){
            if (err) {
                return console.log(err);
            }
        
            console.log("Success!", res.json(req.body))

       })
    });
         

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));

    });
app.listen(PORT, function() {
    console.log("App listening on localhost: " + PORT);
  });



