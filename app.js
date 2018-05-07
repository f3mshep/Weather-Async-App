const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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