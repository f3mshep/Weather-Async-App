const request = require('request');

request(
  {
    url:
      "https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20st&key=AIzaSyC4CKnO0SgpxZTR0k9ZkwTM6ea6Aob9AIY",
    json: true
  },
  (error, response, body) => {
    console.log(body);
  }
);