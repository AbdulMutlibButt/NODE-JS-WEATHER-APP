console.log("javascript loaded");
// fetch("http://localhost:3000/weather?").then((res) => {
//   res.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.temperature);
//       console.log(data.location);
//     }
//   });
// });
const form = document.querySelector("form");
const input = document.querySelector("input");
const heading = document.querySelector("h1");
const paragraph = document.querySelector("p");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = input.value;
  fetch("/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
       heading.innerHTML= data.error
        paragraph.innerHTML=''
    } else {
        heading.innerHTML = data.location;
        paragraph.innerHTML = 'Temperature = '+data.temperature;
      }
    });
  });
  console.log(location);
});
