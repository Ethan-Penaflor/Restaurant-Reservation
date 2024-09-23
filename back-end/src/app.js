const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors"); // Import CORS

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("../src/tables/tables.router");

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: "https://restaurant-reservation-vgz5.onrender.com", // Specify your frontend URL
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(express.json());

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;