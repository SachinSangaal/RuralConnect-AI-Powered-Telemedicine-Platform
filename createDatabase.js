const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server's hostname
  user: 'root',      // Replace with your MySQL username
  password: 'password'  // Replace with your MySQL password
});

// Connect to MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL server');

  // Create the database
  connection.query('CREATE DATABASE IF NOT EXISTS mydatabase', (error) => {
    if (error) {
      console.error('Error creating database:', error);
    } else {
      console.log('Database created successfully');
    }

    // Close the connection
    connection.end();
  });
});
