const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    address:({
      alias: 'a',
      demand: true,
      describe: "Address to fetch weather for",
      string: true
    })
  })
  .help()
  .alias('help', 'h')
  .argv;

require('dotenv').config()
KEY = process.env.GEO_KEY;

geocode.geocodeAddress(argv.address, (errorMessage, results)=>{
  if (errorMessage){
    console.log(errorMessage);
  }
  else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});

weather.getWeather(37.9598787, -122.1017303, (error, results)=>{
  if(error){
    console.log("Unable to fetch the weather")
  }
  else{
    console.log(`Temperature: ${results.currently.temperature}`);
    console.log(`Chance of Rain: %${results.currently.precipProbability}`);
    console.log(`Weather: ${results.minutely.summary}`);
  }
});
