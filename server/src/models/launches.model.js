const uuid = require("uuid");

const launches = new Map();

const launch = {
  flightNumber: "4592",
  mission: " mission1",
  rocket: " explore x1",
  launchDate: new Date("December 27, 2025"),
  target: "blackhole :)",
  customer: ["Nasa", "TSH"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(id) {
  return launches.has(id);
}

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

function abortLaunchWithId(id) {
  const abortedLaunch = launches.get(id);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchWithId,
};
