// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express();
const port = 3000;
const { exec } = require('child_process');
app.use(express.static('public'));
app.use(bodyParser.text()); // Parse request body as plain text

app.set('view engine', 'ejs');

app.get('/',(req,res)=> {
  res.sendFile(__dirname + '/home.html');
})
app.get('/display.html',(req,res)=> {
  res.sendFile(__dirname + '/display.html');
})



app.post('/sendData', (req, res) => {
    const receivedData = req.body;
    console.log('Data received from client:', receivedData);

    // Create a child process to run the Python script
    const pythonProcess = spawn('python', ['test.py', receivedData]);
    // Handle data from the Python script
    pythonProcess.stdout.on('data', (data) => {
        const processedDataFromPython = data.toString();
        console.log('Processed data from Python script:', processedDataFromPython);

        // Respond to the client with the processed data (optional)
        res.json({ processedData: processedDataFromPython });
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
        }
        
    });
});

app.get('/about', (req, res) => {
  exec('python test1.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Failed to execute Python script.' });
    }

    // Capture the text data from stdout
    const textFromPython = stdout.trim(); // Trim to remove any leading/trailing whitespace

    // Render an EJS template and pass the data to it
    res.render('one', { data: textFromPython });
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
