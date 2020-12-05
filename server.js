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

// Get '*'
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Get '/api.notes/'
app.get("/api/notes", (req, res) => {
    res.json(db);
});

// POST '/api/notes'

// DELETE '/api/notes/id'




app.listen(PORT, () => {
    console.log("you've connected at http://localhost:" + PORT);
});