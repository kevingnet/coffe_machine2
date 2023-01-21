//const db = require("../models");

const MAX_DELAY = 60; //60 seconds

const MAX_WATER = 480; 
const MAX_BEANS = 240; 

const SIZE_TALL = 4; 
const SIZE_GRANDE = 5;
const SIZE_VENTI = 6; 

const GRAIN_FACTOR = 1;
const WATER_FACTOR = 4;

function percentage(value, total) {
  return (100 * value) / total;
} 

const Coffee = db.coffees;

// Create and Save a new Coffee
exports.createzzz = (req, res) => {

  let wtr = MAX_WATER;
  let bns = MAX_BEANS;

  // Create a Coffee
  const coffeerec = new Coffee({
    water: wtr,
    beans: bns
    });

  coffeerec
    .save(coffeerec)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Coffee."
      });
    });
};


// Fill coffee machine to the given values for water and beans, or fill to capacity 480/240
exports.fillzzz = (req, res) => {
  console.log('fill res: ' + res);
  console.log('fill res.body: ' + res.body);
  console.log('fill req.body.water: ' + req.body.water);
  let wtr = MAX_WATER;
  let bns = MAX_BEANS;
  if(req.body) {
    if (req.body.water) {
      wtr = req.body.water;
    }  
    if (req.body.beans) {
      bns = req.body.beans;
    }
  }
  //console.log("IN param fill wtr: " + wtr);

  //get the latest, newest 'coffee'
  Coffee.find().limit(1).sort({$natural:-1})
  .then(data => {
    console.log('fill data[0]: ' + data[0]);
    data.water = wtr;
    data.beans = bns;
    //console.log("FROM db fill data.water: " + data.water);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while getting the values."
    });
  });

  const coffeerec = new Coffee({
    water: wtr,
    beans: bns,
    });

  // Save Coffee in the database
  coffeerec
    .save(coffeerec)
    .then(data => {
      res.send(data);
      //console.log("AFTER SAVING to db fill data.water: " + data.water);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Coffee."
      });
    });

};

// Retrieve all Coffees from the database.
exports.brewzzz = (req, res) => {
  let grinder = 5;
  let size = SIZE_TALL;
  let delay = 0;
  let water = 0;
  let beans = 0;
  console.log(req.body.size);
  if(req.body) {
    if (req.body.grinder) {
      grinder = req.body.grinder;
    }  
    if (req.body.size) {
      size = req.body.size;
    }    
    if (req.body.delay) {
      delay = req.body.delay;
    }
  }

  Coffee.find().limit(1).sort({$natural:-1})
  .then(data => {
    console.log('brew data[0]: ' + data[0]);
    var rows = JSON.parse(JSON.stringify(data[0]));
    water = rows["water"];
    beans = rows["beans"];

    sz = parseInt(size, 10);
    let sub_water = WATER_FACTOR * sz;
    let sub_grain = WATER_FACTOR * sz;
  
    data[0].water = data[0].water - sub_water;
    data[0].beans = data[0].beans - sub_grain;

    if( data[0].water < 0) {
      res.send("Cannot brew coffee, as there isn't enough water, please refill the machine");
      return;
    }
    if( data[0].beans < 0) {
      res.send("Cannot brew coffee, as there aren't enough beans, please refill the machine");
      return;
    }

    const coffeerec = new Coffee({
      water: data[0].water,
      beans: data[0].beans,
      });
  
    // Save Coffee in the database
    coffeerec
      .save(coffeerec)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Coffee."
        });
      });
    })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving coffees."
    });
  });
};

// Retrieve Coffee Machine Values database.
exports.levelzzz = (req, res) => {
  Coffee.find().limit(1).sort({$natural:-1})
    .then(data => {
      console.log('level data: ' + data);
      var rows = JSON.parse(JSON.stringify(data[0]));
      water = percentage(parseInt(rows["water"], 10), MAX_WATER);
      beans = percentage(parseInt(rows["beans"], 10), MAX_BEANS);
      water = Math.floor(water);
      beans = Math.floor(beans);
      data[0].water = String(water);
      data[0].beans = String(beans);
      console.log('water: ' + String(water));
      var d = {
        "water": String(water),
        "beans": String(beans)
      };
      //console.log(JSON.stringify(d));

      res.send(JSON.stringify(d));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coffees."
      });
    });
};
