const express = require("express");
const router = express.Router();
var initModels = require("../../models/init-models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

var models = initModels(sequelize);

// races by year
router.get("/:year", async (req, res) => {
  const results = await models.races
    .findAll({
      where: {
        year: req.params.year,
        date: { [Op.lte]: Date.now() },
      },
      order: [["round", "ASC"]],
    })
    .catch(errHandler);
  res.json(results);
});

router.get("/:year/next", async (req, res) => {
  const results = await sequelize
    .query(
      `select a.* from races a 
      join
      (select min(r.round) as nextRound from races r where r.date > curdate()) m
      on a.round = m.nextRound
      where a.year = ${req.params.year}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);

  res.json(results);
});

// Get single user
// router.get("/:id", async (req, res) => {
//   const user = await User.findAll({
//     where: {
//       id: req.params.id,
//     },
//   }).catch(errHandler);

//   if (user && user.length > 0) {
//     res.json(user);
//   } else {
//     res.status(400).json({ msg: "user not found" });
//   }
// });

// // Create user
// router.post("/", async (req, res) => {
//   const newUser = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   if (!newUser.name || !newUser.email) {
//     return res.status(400).json({ msg: "Please include a name and email" });
//   }

//   const user = await User.create(newUser).catch(errHandler);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(500).json({ msg: "internal db error occoured" });
//   }
// });

// // Update user
// router.put("/:id", async (req, res) => {
//   const user = await User.findAll({
//     where: {
//       id: req.params.id,
//     },
//   }).catch(errHandler);

//   if (user && user.length > 0) {
//     const updUser = req.body;
//     const result = await User.update(
//       {
//         name: updUser.name ? updUser.name : user[0].name,
//         email: updUser.email ? updUser.email : user[0].email,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     ).catch(errHandler);

//     res.json({ msg: "user updated", updUser });
//   } else {
//     res.status(400).json({ msg: "user not found" });
//   }
// });

// // Delete Member
// router.delete("/:id", async (req, res) => {
//   const user = await User.findAll({
//     where: {
//       id: req.params.id,
//     },
//   }).catch(errHandler);

//   if (user && user.length > 0) {
//     const user = User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     res.json({
//       msg: "Member deleted",
//       user,
//     });
//   } else {
//     res.status(400).json({ msg: "user not found" });
//   }
// });

// // Get all users with pagination
// router.get("/:page/:pageSize", async (req, res) => {
//   const page = parseInt(req.params.page);
//   const pageSize = parseInt(req.params.pageSize);

//   const users = await User.findAll({
//     attributes: ["id", "name", "email"],
//     ...paginate({ page, pageSize }),
//   }).catch(errHandler);

//   res.json(users);
// });

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

// const paginate = ({ page, pageSize }) => {
//   const offset = page * pageSize;
//   const limit = pageSize;

//   return {
//     offset,
//     limit,
//   };
// };

module.exports = router;
