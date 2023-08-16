const {
  getAllLaunches,
  schedualNewLaunch,
  existsLaunchWithId,
  abortLaunchWithId,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpPostNewLaunch(req, res) {
  const newLaunch = req.body;

  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.launchDate ||
    !newLaunch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  newLaunch.launchDate = new Date(newLaunch.launchDate);
  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await schedualNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

async function httpAbortLaunch(req, res) {
  const id = req.params.id;
  const existLaunch = await existsLaunchWithId(id);
  if (!existLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchWithId(id);
  if (!aborted) {
    return res.status(400).json({
      error: " Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}
module.exports = {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpAbortLaunch,
};
