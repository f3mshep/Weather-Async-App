
const request = require('request');
KEY = process.env.GEO_KEY;
require("dotenv").config();
const encodeAddress = (address) => encodeURIComponent(address);

const getRequest = (encodedAddress, callback) => {
  request(
  {
    url:

      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}?key=${KEY}`,
    json: true
  },
  (error, response, body) => {
    if(error){
      callback(error);
    }
    else if(body.results.length < 1){
      callback("Nothing found at that address");
    }
    else if(body.status === "OK") {
      callback(undefined, {
        address:body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  }
  );
}

const geocodeAddress = (address, callback) => {
  let encodedAddress = encodeAddress(address);
  getRequest(address, callback);
}


module.exports = {geocodeAddress};
