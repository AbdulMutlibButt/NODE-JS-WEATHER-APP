"use strict";

console.log("javascript loaded");
fetch("http://localhost:4000/weather?").then(function (res) {
  res.json().then(function (data) {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.temperature);
      console.log(data.location);
    }
  });
});
var form = document.querySelector("form");
var input = document.querySelector("input");
var heading = document.querySelector("h1");
var paragraph = document.querySelector("p");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var location = input.value;
  fetch("http://localhost:4000/weather?address=" + location).then(function (res) {
    res.json().then(function (data) {
      if (data.error) {
        heading.innerHTML = data.error;
        paragraph.innerHTML = '';
      } else {
        heading.innerHTML = data.location;
        paragraph.innerHTML = 'Temperature = ' + data.temperature;
      }
    });
  });
  console.log(location);
});