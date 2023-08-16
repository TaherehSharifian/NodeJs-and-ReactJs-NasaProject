const uuid = require("uuid");

const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const launch = {
  flightNumber: "4592",
  mission: " mission1",
  rocket: " explore x1",
  launchDate: new Date("December 27, 2025"),
  target: "Kepler-296 e",
  customer: ["Nasa", "TSH"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(id) {
  return await launches.findOne({ flightNumber: id });
}

async function getAllLaunches() {
  return await launches.find({}, "-_id -__v");
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({ planetName: launch.target });
    if (!planet) {
      throw new Error("No matching planet found");
    }

    await launches.findOneAndUpdate(
      { flightNumber: launch.flightNumber },
      launch,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log("Could not save launch", err);
  }
}

async function schedualNewLaunch(launch) {
  latestFlightNumber = uuid.v4().split("-")[2];

  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customer: ["Tahereh", "NASA"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchWithId(id) {
  const abortedLaunch = await launches.updateOne(
    { flightNumber: id },
    { upcoming: false, success: false }
  );
  return abortedLaunch.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  schedualNewLaunch,
  abortLaunchWithId,
};
