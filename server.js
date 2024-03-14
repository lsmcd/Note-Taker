const express = require("express");
const {v4: uuidv4} = require("uuid");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

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
    var request = JSON.parse(JSON.stringify({title: title, text: text, id: id}));
    // Reads and writes the new note
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        data[data.length] = request;
        data = JSON.stringify(data, null, "\t");
        
        fs.writeFile(__dirname + "/db/db.json", data, "utf8", (err) => {
            if (err) throw err;
        });
    });
    res.send(request);
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let id = req.params.id;
        data = JSON.parse(data);
        // Goes through the data JSON object looking for an ID match
        for (let i = 0; i < data.length; i++){
            if (data[i].id === id){
                data.splice(i, 1);
                console.log(data);
                console.log("Successfully deleted");
            }
        }
        data = JSON.stringify(data, null, "\t");
        fs.writeFile(__dirname + "/db/db.json", data, "utf8", (err) => {
            if (err) throw err;
        });
    });
});

app.listen(PORT, function (err) {
    err && console.log(err);
    console.log("Server listening on PORT", PORT);
})