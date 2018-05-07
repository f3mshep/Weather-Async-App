const request = require("request");
require("dotenv").config();
DARKSKY_KEY = process.env.DARKSKY_KEY;

let getWeather = (lat, lng, callback)=> {
  request(
    {
      json: true,
      url: `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, body);
      } else {
        callback("Unable to fetch weather.");
      }
    }
  );
}

module.exports = {
  getWeather
};