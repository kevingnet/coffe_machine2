module.exports = app => {
  /*
  const coffees = require("../controllers/coffee.controller.js");
  
  var router = require("express").Router();

  // Fill Coffee Machine
  router.post("/fillzzz", coffees.fill);

  // Brew a cup of Joe
  router.post("/brewzzz", coffees.brew);

  // Retrieve Coffees Machine Values
  router.get("/levelzzz", coffees.level);*/

  app.use("/", router);
};
