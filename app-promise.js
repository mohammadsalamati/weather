const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: "a",
      describe: "Latitude of your location",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

var encodeAddress = encodeURIComponent(argv.address);
var urlAddress = `http://localhost:8000/geoAPI${encodeAddress}.json`;

axios
  .get(urlAddress)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Your addrss not found");
    } else if (response.data.status === "OK") {
      console.log(response.data.results[0].formatted_address);
      [lat, lng] = [
        response.data.results[0].geometry.location.lat,
        response.data.results[0].geometry.location.lng
      ];
      var weatherURL = `https://api.darksky.net/forecast/780642ff171bdca7622f8bf7274f39d1/${lat},${lng}`;
      return axios.get(weatherURL);
    }
  })
  .then(response => {
    var temperature = response.data.currently.temperature
    var humidity  = response.data.currently.humidity
    console.log(`Temperature: ${temperature}\nHumidity: ${humidity}`);
    
  })
  .catch(err => {
    console.log(err);
  });
