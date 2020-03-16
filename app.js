const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = data => {
    const { cityDetails, weatherDetails } = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weatherDetails.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weatherDetails.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

    // update the night and day images
    const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    let timeSrcImg = weatherDetails.IsDayTime ? "img/day.svg" : "img/night.svg";

    time.setAttribute("src", timeSrcImg);

    // remove the display none class
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }
};

cityForm.addEventListener("submit", e => {
    //prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with the new city
    forecast
        .updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem("location", city);
});

if (localStorage.getItem("location")) {
    forecast
        .updateCity(localStorage.getItem("location"))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}