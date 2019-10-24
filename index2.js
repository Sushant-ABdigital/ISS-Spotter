const { nextISSTimesForMyLocation } = require("./iss_promised");

// see index.js for printPassTimes
// copy it from there, or better yet, moduralize and require it in both files

//Formatter
const formatter = arr => {
  for (let a of arr) {
    let date = new Date(a.risetime);
    console.log(`Next pass at ${date} for ${a.duration} seconds`);
  }
};

// Call
nextISSTimesForMyLocation()
  .then(passTimes => {
    formatter(passTimes);
  })
  .catch(err => console.log("It didnt work", err));
