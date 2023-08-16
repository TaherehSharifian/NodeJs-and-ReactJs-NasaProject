const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const MONGO_URL =
  "mongodb+srv://nasa-api:cYJtRyGxF69adowZ@nasa-cluster.6kqia4h.mongodb.net/?retryWrites=true&w=majority";

const { loadPlanetsData } = require("./models/planets.model");

const PORT = 8080;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("mongodb connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

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
