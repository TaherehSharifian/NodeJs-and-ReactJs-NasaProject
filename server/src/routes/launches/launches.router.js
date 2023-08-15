const express = require("express");

const {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

const launchRouter = express.Router();

launchRouter.get("/", httpGetAllLaunches);
launchRouter.post("/", httpPostNewLaunch);
launchRouter.delete("/:id", httpAbortLaunch);

module.exports = launchRouter;
