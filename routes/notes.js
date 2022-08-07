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
    const noteNew = {
      title,
      text,
      note_id: uuidv4(),
    };

    fs.readFile('./db/db.json', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let newNotes = JSON.parse(data);
        newNotes.push(noteNew);
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json(newNotes);
          }
        });
      }
    });
  }
});

module.exports = notes;
