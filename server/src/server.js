const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { loadPlanetsData } = require("./models/planets.model");

const PORT = 8080;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("mongodb connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const MONGO_URL = process.env.MONGO_URL;

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

startServer();

module.exports = server;
