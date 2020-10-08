const express = require('express');
const fs = require('fs');
const path = require("path");

const json = require("./db/db.json")

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
    res.json(json)
})
app.post('/api/notes', (req, res) =>{
    const newObj = req.body
    
    let id = Math.random().toString(36).substr(2, 9)
    newObj.id = id 
    json.push(newObj)
    updateDb(json)
    res.json(json)
})
app.delete('/api/notes/:id', (req,res) =>{
    console.log(req.params)

    const result = json.filter(note => note.id != req.params.id)
    updateDb(result)
    res.send("updated value")

})

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

const updateDb = data =>{
    const jsonPath = path.join(__dirname, "/db/db.json")
    fs.writeFile(jsonPath, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log("adding data to JSON");
        })
}


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

