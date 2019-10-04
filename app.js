const yargs = require("yargs");

const weather = require("./weather/weather");
const geocode = require("./geocode/geocode");

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

geocode.geocodeAddress(argv.a, (errorMsg, results) => {
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    weather.getWeather(results.lat, results.lng, (errorMsg, weatherResults) => {
      if (errorMsg) {
        console.log(errorMsg);
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2));
      }
    });
  }
});
