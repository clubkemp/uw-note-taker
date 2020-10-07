const express = require('express')


const app = express();
const PORT = 2020

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

