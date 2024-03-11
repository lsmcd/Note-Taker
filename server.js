const express = require("express");

const PORT = 3001

app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")
});

app.get("/api/notes", (req, res) => {
    res.sendFile(__dirname + "/db/db.json")    
});

app.post("/api/notes", (req, res) => {
    //TODO this creates a new note and adds it to the json database
    // NEED TO ADD MIDDLEWARE FOR THE RESPONSE 
});

app.listen(PORT, function (err) {
    err && console.log(err)
    console.log("Server listening on PORT", PORT)
})