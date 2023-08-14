const uuid = require("uuid");

const launches = new Map();

const launch = {
  flightNumber: "4592",
  mission: " mission1",
  rocket: " explore x1",
  launchDate: new Date("December 27, 2025"),
  destination: "blackhole :)",
  customer: ["Nasa", "ZTM"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber = uuid.v4().split("-")[2];

  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["Tahereh", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
