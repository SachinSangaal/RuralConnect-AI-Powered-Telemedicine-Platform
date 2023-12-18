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
const accountSid = 'AC20f0a6ff7fd419439413d44162e93a62';
const authToken = 'b34d81f769fddbcf3936b4e920d9b4f3';
const twilioNumber = '+14015196438';
const myPhoneNumber = '+916302896003';

const client = new twilio.Twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

function generateOTP() {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

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
    res.render("home1");
  } else {
    // Redirect to error page
    res.sendFile(__dirname + '/error.html');
  }
});



// Handle POST requests to '/save-spoken-text'


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;