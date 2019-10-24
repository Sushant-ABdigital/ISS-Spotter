/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
//Removing unnecessoary imports.
const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("184.68.214.222", (error, data) => {
//   if (error) {
//     console.log("It ain't it", error);
//     return;
//   }
//   console.log("Working !!", data);
// });

// fetchISSFlyOverTimes("cords", (error, data) => {
//   if (error) {
//     console.log("Failed to load the ISS", error);
//     return;
//   }
//   console.log("Working!",data);
// });

//Formatter
const formatter = arr => {
  for (let a of arr) {
    let date = new Date(a.risetime);
    console.log(`Next pass at ${date} for ${a.duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // console.log(passTimes);
  formatter(passTimes);
});
