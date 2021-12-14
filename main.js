// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let ul = document.querySelector(".ajax-section .cities");
let form = document.querySelector(".top-banner form");
let input = document.querySelector(".top-banner input");
let msg = document.querySelector(".top-banner .msg");
let apiKey = "ef81238f4f293901827e696716afc98f";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let {
                main: { temp },
                sys: { country },
                weather,
                name,
            } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
            const li = document.createElement("li");
            li.classList.add("city");
            li.innerHTML = `
            <div>
            <h2 class="city-name" data-name="${name},${country}">
                <span>${name}</span>
                <sup>${country}</sup>
            </h2>
            <div class="city-temp">${Math.floor(temp)}<span>℃</span></div>
            <figure>
                <img class="city-icon" src="${icon}" alt="${name} weather situation">
                <figurecaption>${weather[0].description}</figurecaption>
            </figure>
            </div>
          `;
            ul.appendChild(li);
        })
        .catch(() => {
            msg.innerText = "Enter a valid city"
        });
    input.value= ""
});
