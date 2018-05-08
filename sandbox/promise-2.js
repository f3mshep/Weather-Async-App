const request = require("request");
require("dotenv").config();
KEY = process.env.GEO_KEY;

const geocodeAddress = (address) => {
  const encodedAddress = encodeAddress(address)
  geocodePromise = new Promise((resolve, reject)=>{
    request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}?key=${KEY}`,
      json: true
    },
    (error, response, body) => {
      if (body.status == "OK" && body.results.length > 0){
        resolve(body.results[0]);
      }
      else {
        reject(error);
      };
    }
    );
  });
  return geocodePromise
};

const encodeAddress = address => encodeURIComponent(address);

const getRequest = (encodedAddress, callback) => {
  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}?key=${KEY}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback(error);
      } else if (body.results.length < 1) {
        callback("Nothing found at that address");
      } else if (body.status === "OK") {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
};



geocodeAddress("94553").then(
  results => {
    console.log(results);
  },
  error => {
    console.log(error);
  }
);
