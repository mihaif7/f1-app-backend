const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
var initModels = require("../../models/init-models");

var models = initModels(sequelize);

// Get all users
router.get("/", async (req, res) => {
  const results = await models.seasons
    .findAll({
      where: { year: { [Op.gte]: 1996 } },
      order: [["year", "DESC"]],
    })
    .catch(errHandler);
  res.json(results);
});

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

module.exports = router;
