const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.text()); // Parse request body as plain text

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/display.html', (req, res) => {
    res.sendFile(__dirname + '/display.html');
});

app.post('/sendData', (req, res) => {
  const receivedData = req.body;
  console.log('Data received from client:', receivedData);

  // Create a child process to run the Python script
  const pythonProcess = spawn('python', ['test1.py', receivedData]);

  // Initialize a variable to store the response from Python
  let pythonResponse = '';
  let pythonError = '';

  // Handle data from the Python script
  pythonProcess.stdout.on('data', (data) => {
      pythonResponse += data.toString();
  });
   console.log(pythonResponse)
  // Handle errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
      pythonError += data.toString();
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
          // Check for Python errors
          if (pythonError) {
              console.error('Python script error:', pythonError);
              res.status(500).json({ error: 'Python script encountered an error' });
          } else {
              // Render an EJS template and pass the data to it
              res.render('one', { data: pythonResponse });
          }
      }
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

