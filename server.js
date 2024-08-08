const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const frontend_url = process.env.frontend || 'http://localhost:3000';
app.use(bodyParser.json());
app.use(cors({
  origin: frontend_url
}));

const DB = process.env.DB_url;

//mongoose.connect('mongodb://127.0.0.1:27017/notesDB');
mongoose.connect(DB).then(()=>{
  console.log("connection sucessfull !");
}).catch(()=>{
  console.log("connection not established~ ");
});


const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model('Note', noteSchema);

app.get('/notes', async (req, res) => {
  try{
    const notes = await Note.find();
    res.json(notes);
  }
  catch(err){
    console.log(err);
  }
  
});

app.post('/notes', async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  await newNote.save();
  res.json(newNote);
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: 'Note deleted' });
});
const port_no = process.env.port || 5000;
app.listen(port_no, () => {
  console.log('Server is running on port 5000');
});
