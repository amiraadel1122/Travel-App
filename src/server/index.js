const dotenv = require('dotenv');
dotenv.config();
//data object endpoint
projectData = {};
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));
// Spin up the server

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
// Initialize all route with a callback function
app.get("/", (request, response) => {
  response.sendFile("dist/index.html");
});

