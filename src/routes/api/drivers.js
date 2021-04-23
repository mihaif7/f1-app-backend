const express = require("express");
const router = express.Router();
var initModels = require("../../models/init-models");
const { QueryTypes } = require("sequelize");

// get drivers from race
router.get("/:raceId", async (req, res) => {
  const results = await sequelize
    .query(
      `SELECT d.driverId, d.number, code, forename, surname FROM drivers as d
        INNER JOIN results as r ON d.driverId = r.driverId WHERE r.raceId =${req.params.raceId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);

  res.json(results);
});

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

module.exports = router;
