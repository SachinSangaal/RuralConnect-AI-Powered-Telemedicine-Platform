const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const twilio = require('twilio');
const translate = require('node-google-translate-skidz');
const app = express();
const port = 4000;

const { exec } = require('child_process');
app.use(express.static('public'));
app.use(bodyParser.text()); // Parse request body as plain text

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sih',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
app.get('/',(req,res)=> {
  res.sendFile(__dirname + '/home1.html');
})
app.post('/save-spoken-text', (req, res) => {
  const spokenText = req.body.text;

  // Translate the spoken text from Telugu to English
  translate({
    text: spokenText,
    source: 'te', // Source language (Telugu)
    target: 'en', // Target language (English)
  }, (result) => {
    if (result.translation) {
      // Display the translated text in the terminal
      console.log('Received spoken text:', spokenText);
      console.log('Translated text:', result.translation);

      // Pass the translated text to a Python script using a child process
      const pythonProcess = spawn('python', ['test.py', result.translation]);

      // Handle data from the Python script if needed
      pythonProcess.stdout.on('data', (data) => {
        // Handle data from the Python script (if any)
        console.log('Python script output:', data.toString());
      });

      // Handle errors or process exit
      pythonProcess.on('error', (error) => {
        console.error('Error running Python script:', error);
        res.status(500).json({ error: 'An error occurred while running the Python script' });
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Python script exited with code ${code}`);
          res.status(500).json({ error: 'Python script exited with an error' });
        } else {
          res.sendStatus(200); // Send a success response
        }
      });
    } else {
      console.error('Translation Error:', result.error);
      res.status(500).json({ error: 'Translation error' });
    }
  });
});
app.get('/fetchdata', (req, res) => {
  const query = 'SELECT * FROM sample';
  console.log("hello")
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    res.render('one.ejs', { data: results });
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


