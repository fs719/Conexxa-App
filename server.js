const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const tutors = [];

app.get('/api/tutors', (req, res) => {
  res.json(tutors);
});

app.post('/api/tutors', (req, res) => {
  const tutor = req.body;
  tutors.push(tutor);
  res.status(201).json(tutor);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

