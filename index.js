const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://lapbylap.netlify.app",
    "http://localhost:5000",
  ],
  optionsSuccessStatus: 200,
  methods: "GET",
};

// Init middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// DB Connection
require("./src/database/connection");

// Bootstrap
require("./src/bootstrap")();

// User routes
app.use("/api/seasons", require("./src/routes/api/seasons"));
app.use("/api/races", require("./src/routes/api/races"));
app.use("/api/results", require("./src/routes/api/results"));
app.use("/api/laptimes", require("./src/routes/api/laptimes"));
app.use("/api/circuit", require("./src/routes/api/circuit"));
app.use("/api/drivers", require("./src/routes/api/drivers"));

// App config
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
