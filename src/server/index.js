const dotenv = require("dotenv");
dotenv.config();
//data object endpoint
let projectData = [];
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
const fetch = require("node-fetch");
app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
// Initialize all route with a callback function
app.get("/allData", (req, res) => {
  res.send(projectData);
});

app.post("/geoNamesData", (req, res) => {
  let geoNObj = {
    long: req.body.long,
    lat: req.body.lat,
  };
  projectData.push(geoNObj);
  console.log("projectData1", projectData);
  res.status(200).send(projectData);
});
app.post("/weatherData", (req, res) => {
  let weatherObj = {
    high: req.body.high,
    low: req.body.low,
    description: req.body.description,
  };
  projectData.push(weatherObj);
  console.log("projectData2", projectData);
  res.status(200).send(projectData);
});
app.post("/pixbayData", (req, res) => {
  let pixaObj = {
    img: req.body.image,
  };
  projectData.push(pixaObj);
  console.log("projectData3", projectData);
  res.status(200).send(projectData);
});
