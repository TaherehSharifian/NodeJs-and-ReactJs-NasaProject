const express = require("express");

const {
  httpGetAllLaunches,
  httpPostNewLaunch,
} = require("./launches.controller");

const launchRouter = express.Router();

launchRouter.get("/", httpGetAllLaunches);
launchRouter.post("/", httpPostNewLaunch);

module.exports = launchRouter;
