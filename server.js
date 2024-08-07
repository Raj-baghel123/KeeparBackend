const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://effortless-smakager-283501.netlify.app'
}));

const DB = "mongodb+srv://baghelraj662:keepar@cluster0.m7exz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
