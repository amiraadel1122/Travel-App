//geonames api
const geo_baseURL = "http://api.geonames.org/searchJSON?q=";
const user_name = "amiraadel";
//weatherbit api
const weatherbit_baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbit_apiKey = "3ffe7b05be954f998ff6267844ad7985";
//pixabay api
const pixabay_baseUrl = "https://pixabay.com/api/?";
const pixbay_apiKey = "6645421-844c46144b8e37ea2e38a1070";
//============= Handle trip submit
document.getElementById("submitTrip").addEventListener("click", submitTrip);
let departure_date;
let return_date;
async function submitTrip(e) {
  e.preventDefault();
  let cityValue = document.getElementById("city").value;
  departure_date = document.getElementById("departure").value;
  return_date = document.getElementById("return").value;
  if(!cityValue){
    alert('Please Enter destination first!!')
  }else{
    geoNamesDataa(cityValue)
    .then(async (data) => {
      //  console.log(" geodata", data);
      return await postData("http://localhost:8000/geoNamesData", {
        lat: data.geonames[0].lat,
        long: data.geonames[0].lng,
      });
    })
    .then((res) => {
      const lat = res[res.length - 1].lat;
      const long = res[res.length - 1].long;
      console.log("longitude", long);
      console.log("latitude", lat);
      return { lat, long };
    })
    .then(async ({ lat, long }) => {
      console.log("longituderes", long);
      console.log("latituderes", lat);
      return await weatherbitData(lat, long);
    })
    .then((weatherData) => {
      console.log("weatherData", weatherData);
      return postData("http://localhost:8000/weatherData", {
        high: weatherData.data[0].high_temp,
        low: weatherData.data[0].low_temp,
        description: weatherData.data[0].weather.description,
      });
    })
    .then(async () => {
      return await pixbyData(cityValue);
    })
    .then((pixaData) => {
      console.log("imageDatea", pixaData);
      return postData("http://localhost:8000/pixbayData", {
        image: pixaData.hits[0].webformatURL,
      });
    })
    .then(updateView())
    .then((res) => console.log("helllllooooe from client", res) || res.json())
    .catch((err) => err);
}
  }
  
//==========get geonames data
const geoNamesDataa = async (city) => {
  try {
    const res = await fetch(
      `${geo_baseURL}${city}&maxRows=1&username=${user_name}`
    );
    data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
//=========get wetaherbit data
const weatherbitData = async (latitude, longitude) => {
  try {
    // debugger
    const res = await fetch(
      `${weatherbit_baseUrl}&lat=${latitude}&lon=${longitude}&key=${weatherbit_apiKey}`
    );
    data = await res.json();
    console.log("weatherdataaa", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
//=============get pixabay data
const pixbyData = async (city) => {
  try {
    // debugger
    const res = await fetch(
      `${pixabay_baseUrl}key=${pixbay_apiKey}&q=${city}&image_type=photo`
    );
    data = await res.json();
    console.log("photo", data);
    console.log("photoof", city);
    return data;
  } catch (error) {
    console.log(error);
  }
};
//===========postData
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};



//=======Update the UI
const updateView = async () => {
  // debugger
let returnDate = new Date(return_date).getTime();
let departDate = new Date(departure_date).getTime();

const tripLength = returnDate - departDate ;
const tripLengthDays = tripLength / (1000*3600*24);
  const req = await fetch("http://localhost:8000/allData");

  try {
    const dataa = await req.json();
    console.log("dataaaaaa", dataa);
    document.getElementById("city-image").innerHTML = `<div class="info">image of the city:</div><img src="${dataa[dataa.length - 1].image}" />`;
    document.getElementById("trip-to").innerHTML =
    document.getElementById("city").value;
    document.getElementById("dep-date").innerHTML =
    document.getElementById("departure").value;
    document.getElementById("ret-date").innerHTML =
    document.getElementById("return").value;
    document.getElementById("forecast").innerHTML =
      dataa[dataa.length - 2].description;
    document.getElementById("high-temp").innerHTML =
      `<span>${dataa[dataa.length - 2].high} °C</span>`;
    document.getElementById("low-temp").innerHTML = `<span>${dataa[dataa.length - 2].low} °C</span>`;
    document.getElementById("tripLength").innerHTML = `${tripLengthDays} Days`;
  } catch (err) {
    console.log(error);
  }
};
