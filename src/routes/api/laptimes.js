const express = require("express");
const router = express.Router();
var initModels = require("../../models/init-models");

var models = initModels(sequelize);

// Get all users
router.get("/:raceId/:driverId", async (req, res) => {
  const results = await models.laptimes
    .findAll({
      where: {
        driverId: req.params.driverId,
        raceId: req.params.raceId,
      },
      order: [["lap", "ASC"]],
    })
    .catch(errHandler);
  res.json(results);
});

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

module.exports = router;
