const yargs = require('yargs');
const axios = require('axios');

require("dotenv").config();

KEY = process.env.GEO_KEY;
DARKSKY_KEY = process.env.DARKSKY_KEY;

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

const encodeAddress = address => encodeURIComponent(address);
let encodedAddress = encodeAddress(argv.address);
const geocodeURL =`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}?key=${KEY}`;

axios.get(geocodeURL)
.then((response)=>{
  if (response.data.status === "ZERO_RESULTS"){
    throw new Error('Unable to find that address.')
  }
  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherURL = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
})
.then((response)=>{
  const temperature = response.data.currently.temperature;
  const apparentTemp = response.data.currently.apparentTemperature;
  console.log(`It is currently ${temperature}. It feels like ${apparentTemp}.`);
})
.catch((error)=>{
  if (error.code === 'ENOTFOUND'){
    console.log("Unable to connect to API.")
  }
  else {
    console.log(error)
  }
});