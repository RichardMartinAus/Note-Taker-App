const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET Route for retrieving notes
notes.get('/', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// POST Route for notes
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const note = {
      title,
      text,
      note_id: uuidv4(),
    };

    fs.readFile('./db/db.json', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let newNote = JSON.parse(data);
        newNote.push(note);
        fs.writeFile('./db/db.json', JSON.stringify(newNote), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json(newNote);
            console.log('New note succesfully added!');
          }
        });
      }
    });
  }
});

module.exports = notes;
