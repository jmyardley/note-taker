const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require ("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use (express.static("public"));

// Get '/notes'
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Get '/api.notes/'
app.get("/api/notes", (req, res) => {
    res.json(db);
});
// Get '*'
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


// POST '/api/notes'
app.post("/api/notes", (req, res) => {
    let notes = req.body;
    notes.id = (db.length).toString();
    db.push(notes);
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err){
        if (err){
            console.log("err");
            res.sendStatus(404);
        } else {
            console.log("Success");
            res.sendStatus(200);
        }
    })
});

// DELETE '/api/notes/id'
app.delete('/api/notes/:id', function(req, res){

});



app.listen(PORT, () => {
    console.log("you've connected at http://localhost:" + PORT);
});