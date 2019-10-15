const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forcast");

//create an express application
const app = express();

//define express paths
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/*
Setup Handlebars Views and location
*/
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//create static directory to serve
app.use(express.static(publicDirectory));

//configure application routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "i am konstantin"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me!",
    name: "i am konstantin"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "The is the super helpful Message!",
    title: "some title",
    name: "kofi"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "you must provide an address"
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    //call forecast
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      //return the data
      res.send({
        location,
        forecastData,
        address
      });
      //log the return data
      console.log("Data", location);
      console.log("forecastData:", forecastData);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "The help page is not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "The page is not found"
  });
});

//server port
app.listen(3000, () => {
  console.log("server started on 3000");
});
