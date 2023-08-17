const express = require("express");

const planetRouter = require("./planets/planets.router");
const lanuchRouter = require("./launches/launches.router");

const api = express.Router();

api.use("/planets", planetRouter);
api.use("/launches", lanuchRouter);

module.exports = api;
