const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (err, response, address) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${address}`;
      callback(Error(msg), null);
      return;
    }
    /*
    The Error constructor creates an error object. Instances of Error objects are thrown when runtime errors occur. The Error object can also be used as a base object for user-defined exceptions. See below for standard built-in error types.
    */
    //From here the happy path!!! :)
    const result = JSON.parse(address).ip;
    if (address) {
      return callback(null, result);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //Happy path :)
    const rowResult = JSON.parse(body).data;
    const result = { latitude: rowResult.latitude, longitude: rowResult.longitude };
    return callback(null, result);
  });
};

const fetchISSFlyOverTimes = (cords, callback) => {
  request("http://api.open-notify.org/iss-pass.json?lat=51.12640&lon=-114.14190", function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //Here onwards will get the data
    const result = JSON.parse(body).response;
    return callback(null, result);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      console.log("error");
    } else {
      fetchCoordsByIP(ip, (err, coords) => {
        if (err) {
          callback(err, null);
        } else {
          fetchISSFlyOverTimes(coords, (err, data) => {
            if (err) {
              callback(err, null);
            } else {
              return  callback(null, data);
            }
          });
        }
      });
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
