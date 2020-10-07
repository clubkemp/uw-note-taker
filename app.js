const express = require('express')

const app = express();
const PORT = 2020




app.listen(PORT, () =>{
    console.log("App lisetening on http://localhost:" + PORT)
})

