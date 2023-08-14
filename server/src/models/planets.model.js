const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const habitablePlanet = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    data_path = path.join(__dirname, "..", "..", "data", "kepler_data.csv");
    fs.createReadStream(data_path)
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanet;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
