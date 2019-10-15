const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/1872e5cc5df9419927fe72ce35da8a6e/${lat},${lng}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to service", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      const data = `${response.body.daily.data[0].summary}`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
