const express = require("express");
const router = express.Router();
var initModels = require("../../models/init-models");
const { QueryTypes } = require("sequelize");

// get drivers from race
router.get("/:raceId", async (req, res) => {
  const results = await sequelize
    .query(
      `SELECT 
          d.driverId,
          d.number,
          code,
          forename,
          surname,
          c.constructorRef
       FROM
          drivers AS d
              INNER JOIN
          results AS r ON d.driverId = r.driverId
              INNER JOIN
          constructors AS c ON c.constructorId = r.constructorId
              AND r.driverId = d.driverId
       WHERE
          r.raceId = ${req.params.raceId}
       ORDER BY number`,
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
