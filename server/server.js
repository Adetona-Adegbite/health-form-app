// Import Packages
const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser"); // Add missing body-parser import
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize express app
const app = express();

// Necessary Configs
app.use(bodyParser.json());
app.use(cors());

// Load environment variables from .env file
dotenv.config();

// Connect to Database
const conString = process.env.CONN_STRING;
const client = new pg.Client(conString);

client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  console.log("Connected to PostgreSQL");
});

// Setup Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Query to check if the user exists and the password matches
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    // Execute the query
    const result = await client.query(query);

    // If the user is found
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Check if the password matches\
      console.log(user);
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch);
      if (passwordMatch) {
        // Passwords match, send a success response
        res.status(200).json({ message: "Login successful", user });
      } else {
        // Passwords don't match, send an error response
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      // If the user is not found, send an error response
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/create-user", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query to create a new user in the database
    const query =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
    const values = [email, hashedPassword];
    const result = await client.query(query, values);
    const newUser = result.rows[0];
    console.log("New user created:", newUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post("/submit-form", async (req, res) => {
  const { userId, title, formData, score, percentage, level } = req.body;
  console.log(userId, title, formData, score, percentage, level);
  try {
    // Query to insert form data into the database
    const query =
      "INSERT INTO forms (user_id, title, form_data, score,percentage,level) VALUES ($1, $2, $3, $4,$5,$6)";
    const values = [userId, title, formData, score, percentage, level];
    await client.query(query, values);
    res.status(201).json({ message: "Form data submitted successfully" });
  } catch (error) {
    console.error("Error while submitting form data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/user-forms/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    // Query to get all forms submitted by the specified user
    const query = {
      text: "SELECT * FROM forms WHERE user_id = $1",
      values: [user_id],
    };

    // Execute the query
    const result = await client.query(query);

    // Send the forms data as response
    res.status(200).json({ forms: result.rows });
  } catch (error) {
    console.error("Error while fetching user forms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
