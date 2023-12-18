const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const twilio = require('twilio');

const app = express();
const port = 5000;

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
const accountSid = 'ACebdb8485850ce7adccbb28eae5674d6b';
    console.log('Connected to MySQL database');
const authToken = 'b52949ed09d4bcded21f79399af4872e';
const twilioNumber = '+12564458165';
const myPhoneNumber = '+919391782577';

const client = new twilio.Twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

function generateOTP() {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

const generatedOTP = generateOTP(); // Generate OTP when the server starts
console.log("otp="+generatedOTP)

app.get('/', (req, res) => {
  //res.render("start");
  res.sendFile(__dirname + '/start.html');
});
app.get('/otp', (req, res) => {
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
          <style>
              body {
                  background: url('images/img6.jpg') no-repeat center center fixed;
                  background-size: cover;
                  min-height:100vh;
              }
      
              h1 {
                  color: black;
                  text-align: center;
                  margin-top: 20px; 
                  
              }
      
              form {
          background: rgba(255, 255, 255, 0.8);
          padding: 50px;
          width: fit-content;
          margin: 0 auto; /* Center horizontally */
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
          margin-top: 20px; /* Add top margin */
          margin-bottom: 20px; /* Add bottom margin */
      }
      
              
      
              label {
                  display: block;
                  margin-top: 10px;
                  margin-bottom: 10px;
                  font-weight: bold;
                  color: #333;
              }
      
              input[type="text"] {
                  width: 90%;
                  padding: 10px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
              }
      
              input[type="submit"] 
              {
                  display: block;
                  width: 95%;
                  padding: 10px;
                  background: #333;
                  color: #fff;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
              }
          </style>
      </head>
      <body>
          <h1>Authentication</h1>
          <form action="/verify" method="POST" id="auth-form">
              <label for="number">Aadhar number</label>
              <input type="text" id="number" name="Aadhar Number" required>
              
              <!-- OTP input will be shown after a 12-digit Aadhar number is entered -->
              <div id="otp-box" style="display: none;">
                  <label for="otp">OTP</label>
                  <input type="text" id="otp" name="otp" required>
              </div>
              
              <input type="hidden" name="generatedOTP" value="${generatedOTP}">
              <br><br>
              <input type="submit" value="Submit">
          </form>
      
          <script>
              // Get references to the input elements and form
              const aadharInput = document.getElementById('number');
              const otpBox = document.getElementById('otp-box');
              const otpInput = document.getElementById('otp');
              const authForm = document.getElementById('auth-form');
      
              // Add an event listener to the Aadhar input to toggle OTP box visibility
              aadharInput.addEventListener('input', () => {
                  const aadharNumber = aadharInput.value.trim();
                  if (aadharNumber.length === 12) {
                      otpBox.style.display = 'block';
                  } else {
                      otpBox.style.display = 'none';
                      otpInput.value = ''; // Clear OTP input if Aadhar number is not 12 digits
                  }
              });
          </script>
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
    res.render("home");
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
// app.get('/fetchdata', (req, res) => {
//     const query = 'SELECT * FROM sample';
//     console.log("hello")
//     connection.query(query, (err, results) => {
//       if (err) {
//         console.error('Error executing MySQL query:', err);
//         res.status(500).send('Error fetching data');
//         return;
//       }
//       if (results.length === 0) {
//         console.error('No data found in the database');
//         res.status(404).send('No data found');
//         return;
//       }
//       res.render('one.ejs', { data: results });
//     });
//   });

app.get('/renderData', (req, res) => {
  const query = 'SELECT * FROM care where id=(select max(id) from care)'; // Change to your table name
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    // Render the EJS file and pass the data to it
    res.render('one', { dataFromDB: results });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});