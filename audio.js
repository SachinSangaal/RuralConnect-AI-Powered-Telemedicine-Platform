const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

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
const accountSid = 'AC20f0a6ff7fd419439413d44162e93a62';
const authToken = 'b34d81f769fddbcf3936b4e920d9b4f3';
const twilioNumber = '+14015196438';
const myPhoneNumber = '+916302896003';

const client = new twilio.Twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

function generateOTP() {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

const generatedOTP = generateOTP(); // Generate OTP when the server starts
console.log("otp="+generatedOTP)
app.get('/', (req, res) => {
  // Generate a new OTP when a user accesses the root URL
  const generatedOTP = generateOTP();
  console.log("otp=" + generatedOTP);

  // Send the OTP via Twilio
  client.messages
    .create({
      body: `Your OTP is: ${generatedOTP}`,
      from: twilioNumber,
      to: myPhoneNumber,
    })
    .then(() => {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Enter OTP</title>
        </head>
        <body>
            <h1>Enter OTP</h1>
            <form action="/verify" method="POST">
                <label for="otp">OTP:</label>
                <input type="text" id="otp" name="otp" required>
                <input type="hidden" name="generatedOTP" value="${generatedOTP}">
                <br><br>
                <input type="submit" value="Submit">
            </form>
        </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error('Error sending OTP via Twilio:', error);
      res.status(500).send('Error sending OTP');
    });
});

app.get('/display.html',(req,res)=> {
    res.sendFile(__dirname + '/display.html');
  })

  // Set up a route to fetch data from the database
app.get('/fetchdata', (req, res) => {
    const query = 'SELECT * FROM doctor';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Error fetching data');
        return;
      }
  
      res.render('one.ejs', { data: results });
    });
  });

app.post('/verify', (req, res) => {
    const receivedOTP = parseInt(req.body.otp); // Parse receivedOTP as an integer
    const correctOTP = parseInt(req.body.generatedOTP); // Parse correctOTP as an integer
  

  if (receivedOTP === correctOTP) {
    // Redirect to success page
    res.render("home1")
  } else {
    // Redirect to error page
    res.sendFile(__dirname + '/error.html');
  }
});

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});