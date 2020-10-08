//require in the node packages we need
const express = require('express');
const fs = require('fs');
const path = require("path");


//setup express into app
const app = express();
//setup our port variable with the Heroku prot defaulting to 3000
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

//handles the route /notes by sending the notes.html
app.get('/notes', (req, res) =>{
    console.log("notes")
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
//handles the api call on notes to return the json data saved on file
app.get('/api/notes', (req, res) =>{
    const json = readDb();
    res.json(json)
})
//handles a post request to notes
app.post('/api/notes', (req, res) =>{
    let json = readDb();
    //grab the request body containing our new note object
    const newObj = req.body
    //create a random id 0 9 numbers and leters
    let id = Math.random().toString(36).substr(2, 9)
    //add the id to our new object
    newObj.id = id 
    //push the object to our JSON
    json.push(newObj)
    //fire the update db function which writes our data to the db.json file
    updateDb(json)
    //send back the json just to finish the route
    res.json(json)
})
//handles the delete request based on any id the use feeds it
app.delete('/api/notes/:id', (req,res) =>{
    const json = readDb();
    //filter through the array and grab anything that doesn't match the id provided
    const result = json.filter(note => note.id != req.params.id)
    //result than becomes everything the user doesn't want to delete
    //send that to the update db function
    updateDb(result)
    res.json(result)

})
//get wildcard, anything that isn't specified above gets sent to the index.html page
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
//helper function to write data to db.json
const updateDb = data =>{
    //path var to the db.json file
    const jsonPath = path.join(__dirname, "/db/db.json")
    //takes in the path, and the data specifeid in function call to write the file
    //note the stringify is needed
    fs.writeFile(jsonPath, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log("adding data to JSON");
        })
}

const readDb = () =>{
    const jsonPath = path.join(__dirname, "/db/db.json")
    const json = JSON.parse(fs.readFileSync(jsonPath))
    console.log(json)
    return json
}
//start the server listening on the port, log out the port it's listening on
app.listen(PORT, () =>{
    console.log("App lisetening on http://localhost:" + PORT)
})

