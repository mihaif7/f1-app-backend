module.exports = async () => {
  const Races = require("./models/races");

  const errHandler = (err) => {
    console.log("Error: ", err);
  };

  //Use this to initialize db
  // const user = await User.create({
  //   name: "Naruto",
  //   email: "Naruto@gmail.com",
  // }).catch(errHandler);
};
