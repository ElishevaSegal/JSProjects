let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=933be53a5aea4413546fcc7271d55ca3&units=metric`;
let apiWKey = "933be53a5aea4413546fcc7271d55ca3";
let resolteDiv = document.querySelector("#resolteDiv");
let searchInput = document.querySelector("#searchInput");

const cityChosen = async (city) => {
  let searchInput = document.querySelector("#searchInput");
  let h1city = document.querySelector("#city");
  let country = document.querySelector("#country");
  let imageDiv = document.querySelector("#imageDiv");
  let temp = document.querySelector("#temp");
  let wind = document.querySelector("#wind");
  let humid = document.querySelector("#humid");
  let weatherDiv = document.querySelector("#weatherDiv");
  if (
    !searchInput ||
    !h1city ||
    !country ||
    !imageDiv ||
    !temp ||
    !wind ||
    !humid ||
    !weatherDiv
  ) {
    return;
  }
  try {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=933be53a5aea4413546fcc7271d55ca3&units=metric`
    );

    let newData = await data.json();
    h1city.innerHTML = newData.name;
    if (newData.name == undefined || searchInput.value == null) {
      // resolteDiv.innerHTML = " ";
      let popup = document.querySelector("#popup");
      popup.style.display = "block";
      popup.innerHTML = `oops...couldn't find ${city} city`;
      searchInput.innerHTML = "";
      h1city.innerHTML = "";
      country.innerHTML = "";
      imageDiv.src = "";
      temp.innerHTML = "";
      wind.innerHTML = "";
      humid.innerHTML = "";
      weatherDiv.innerHTML = "";
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);
    }
    country.innerHTML = newData.sys.country;
    imageDiv.src = `https://openweathermap.org/img/wn/${newData.weather[0].icon}.png`;
    weatherDiv.innerHTML = newData.weather[0].description;
    temp.innerHTML = `${Math.ceil(newData.main.temp)} &#8451;`;
    if (newData.main.temp < 25) {
      temp.style.color = "blue";
    } else if (newData.main.temp >= 25 && newData.main.temp <= 30) {
      temp.style.color = "goldenrod";
    } else if (newData.main.temp > 30) {
      temp.style.color = "red";
    }
    wind.innerHTML = `Wind: ${newData.wind.speed} m/s`;
    humid.innerHTML = `Humidity: ${newData.main.humidity}%`;
  } catch {}
  setTimeout(() => {
    searchInput.value = "";
  }, 2000);
};
window.addEventListener("load", () => {
  let searchBtn = document.querySelector("#searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      let { value: searchInput } = document.querySelector("#searchInput");
      cityChosen(searchInput);
    });
  }
});
