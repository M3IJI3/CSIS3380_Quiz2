const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  myName: String,
  mySID: String
});

// Create a Model object
let Student;

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const mongouri = req.body.myuri;

  // connect to the database and log the connection
  try {

    await mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Ensure the model is created after the connection
    Student = mongoose.model('s24students', studentSchema);

    // Add the data to the database
    const newStudent = new Student({
        myName: 'Jie Mei', // Replace with your full name
        mySID: '300364433'  // Replace with your student ID
    });

    await newStudent.save();

    res.send(`<h1>Document  Added</h1>`);

  } catch (error) {

    console.error(error);
    res.send('<h1>Error connecting to MongoDB or saving data</h1>');

  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
