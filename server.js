const express = require("express");
const {v4: uuidv4} = require("uuid");
const fs = require("fs");

const PORT = 3001

app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", (req, res) => {
    res.sendFile(__dirname + "/db/db.json");
});

app.post("/api/notes", (req, res) => {
    var {title, text} = req.body;
    var id = uuidv4();
    var reqJSON = JSON.parse(JSON.stringify({title: title, text: text, id: id}));
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        writeDB(reqJSON, JSON.parse(data));
    });
    res.send(reqJSON);
});

writeDB = function(reqJSON, database){
    newJSON = database;
    newJSON[newJSON.length] = reqJSON;
    newJSON = JSON.stringify(newJSON, null, "\t");
    fs.writeFile(__dirname + "/db/db.json", newJSON, "utf8", (err) => {
        if (err) throw err;
    });
}

app.listen(PORT, function (err) {
    err && console.log(err)
    console.log("Server listening on PORT", PORT)
})