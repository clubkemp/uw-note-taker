const express = require('express')
const fs = require('fs');
const path = require("path");


const app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) =>{
    console.log("notes")
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/notes', (req, res) =>{
    const json = JSON.parse(fs.readFileSync("./db/db.json"))
    res.json(json)
})

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});




//TODO: routes needed
    //GET /notes - returns the notes.html file
    //GET * - returns the index.html file
    //GET /api/notes - reads db.json and return as JSON

    //POST /api/notes should receive a new note and save on res.body,
        //generate a unique id for note 
        //then add to db.json, 
        //then return new note

    //Delete /api/notes/:id recieves the id of the note to delete

app.listen(PORT, () =>{
    console.log("App lisetening on http://localhost:" + PORT)
})

