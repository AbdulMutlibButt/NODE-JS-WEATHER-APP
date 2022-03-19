const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const public = path.join(__dirname, "./public");
const views = path.join(__dirname, "./partials");
const api = require("./apis");
const port = process.env.PORT || 3000;

// https://mutlib-weather-application.herokuapp.com/

hbs.registerPartials(views);
app.use(express.static(public));
app.set("view engine", "hbs");

app.get("", (req, res) => {
  res.render("index", {
    title: "HOME PAGE",
    name: "MUTLIB BUTT",
  });
});
app.get("/pages", (req, res) => {
  res.render("pages");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT PAGE HERE",
  });
});
app.get("/about", (req, res) => {
  res.send([
    {
      name: "Mutlib",
      age: 18,
    },
    {
      name: "Ali",
      age: 20,
    },
  ]);
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "NO REQUEST",
    });
  } else if (req.query.address) {
    api.geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        }
        api.forcast(longitude, latitude, (error, forcastData) => {
          if (error) {
            return res.send({
              error,
            });
          }
          res.send({
            temperature: forcastData.temperature,
            location,
          });
        });
      }
    );
  }
  console.log(req.query.address);
});

app.get("/help", (req, res) => {
  res.send("Hello Help");
});

app.get("*", (req, res) => {
  res.send("404 PAGE NOT FOUND");
});

app.listen(port, () => {
  console.log("server is on top 3000");
});
