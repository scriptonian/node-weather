const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2NyaXB0b25pYW4iLCJhIjoiY2sxa3BpNXlxMDJjOTNtbG9vY2dsbGE1eiJ9.EPzKEpKQA32ZuzN1JfbR2g&limit=1`;

  request({ url, json: true }, (error, response) => {
    const { body } = response;
    const { features } = body;
    //console.log("features", features);
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (features.length === 0) {
      callback("Unable To find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[0],
        longitude: features[0].center[1],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geocode;
