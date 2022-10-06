const fs = require('fs');
const path = require('path');

module.exports = app => {

    // notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API ROUTES
    
        // api notes get route
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        // api notes post route
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            
            notes.push(newNote);
            updateDb();
            
                return console.log("Added new note: "+newNote.title);
        });

        // Retrieves id
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        // Deletes id
        app.delete("/api/notes/:id", function(req, res) {
            
            notes.splice(req.params.id, 1);
            updateDb();
            
            console.log("Deleted note with id "+req.params.id);
        });

        // VIEW ROUTES
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // index.html
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates json
        function updateDb() {
            
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                
                if (err) throw err;
                return true;
            });
        }

    });

}