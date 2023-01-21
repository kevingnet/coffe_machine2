const express = require("express");
const cors = require("cors");
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//var bodyParser = require('body-parser')
//var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//const db = require("./app/models");
//require("./app/routes/coffee.routes")(app);

//const router = express.Router();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/test", (req, res) => {
  console.log('server.js using port: ' + PORT);
  res.json({ message: "Welcome to the virtual coffee application" });
});

//require("./app/routes/coffee.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
console.log('using port: ' + PORT);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



const MAX_DELAY = 60; //60 seconds

const MAX_WATER = 480; 
const MAX_BEANS = 240; 

const SIZE_TALL = 4; 
const SIZE_GRANDE = 5;
const SIZE_VENTI = 6; 

const GRAIN_FACTOR = 1;
const WATER_FACTOR = 4;

/*
Unfortunately MongoDB failed to cooperate, spent about two days trying to 
get it to work, ultimately, it's not supposed to work on newer Ubuntus and
other newer versions, there wasn't enough time to switch to Redis, I tried
to do, so, the hack is that because of how the application is structured
there is really only ONE record, which we'll just go ahead and keep in 
app, memory, two types one with two ints, the other one with three,
so we should be good to go with that, can't beat that speed! 
*/

function percentage(value, total) {
  return (100 * value) / total;
} 

class Coffee {
  constructor(water, beans) {
    this.water = water;
    this.beans = beans;
  }
};
class Brew {
  constructor(cup_size, grain, delay) {
    this.cup_size = cup_size;
    this.grain = grain;
    this.delay = delay;
  }
};

let coffee = new Coffee(480, 240);
let brew = new Brew(5, 5, 0);

coffee.water = 480;
coffee.beans = 240;
console.log('server coffee.water: ' + coffee.water);
console.log('server coffee.beans: ' + coffee.beans);
//console.log('fill brew: ' + brew);

// Fill coffee machine to the given values for water and beans, or fill to capacity 480/240
//app.fill = (req, res) => {
//app.post('/fill', jsonParser, function (req, res) {
app.post("/fill", (req, res) => {

  let wtr = MAX_WATER;
  let bns = MAX_BEANS;
  console.log('______________________');
  console.log('fill req: ' + req);
  console.log('fill req.body: ' + req.body);
  if(req.body) {
    console.log('fill req.body.water: ' + req.body.water);
    if (req.body.water) {
      wtr = req.body.water;
    }  
    if (req.body.beans) {
      bns = req.body.beans;
    }
  }
  coffee.water = wtr;
  coffee.beans = bns;
  console.log('fill coffee.water: ' + coffee.water);
  console.log('fill coffee: ' + coffee);
  res.send(JSON.stringify(coffee));
});

// Retrieve all Coffees from the database.
//app.post('/brew', jsonParser, function (req, res) {
app.post("/brew", (req, res) => {
//app.brew = (req, res) => {
  console.log('______________________');
  console.log('brew brew.delay: ' + brew.delay);
  let grain = 5;
  let cup_size = SIZE_TALL;
  let delay = 0;

  console.log(req.body.size);
  if(req.body) {
    if (req.body.grinder) {
      brew.grain = req.body.grain;
    }  
    if (req.body.size) {
      brew.cup_size = req.body.cup_size;
    }    
    if (req.body.delay) {
      brew.delay = req.body.delay;
    }
  }

  sz = parseInt(size, 10);
  let sub_water = WATER_FACTOR * sz;
  let sub_grain = WATER_FACTOR * sz;

  coffee.water = coffee.water - sub_water;
  coffee.beans = coffee.beans - sub_grain;

  if( coffee.water < 0) {
    coffee.water = 0;
    res.send("Cannot brew coffee, as there isn't enough water, please refill the machine");
  }
  if( coffee.beans < 0) {
    coffee.beans = 0;
    res.send("Cannot brew coffee, as there aren't enough beans, please refill the machine");
  }
  res.send(JSON.stringify(coffee));
});

// Retrieve Coffee Machine Values database.
app.get("/level", (req, res) => {
//app.level = (req, res) => {
  console.log('______________________');

  console.log('level coffee.water: ' + coffee.water);
  //console.log('level req: ' + req);
  let wtr = percentage(parseInt(coffee.water, 10), MAX_WATER);
  let bns = percentage(parseInt(coffee.beans, 10), MAX_BEANS);
  console.log('level wtr: ' + wtr);
  wtr = Math.floor(wtr);
  console.log('level wtr: ' + wtr);
  bns = Math.floor(bns);
  //coffee.water = String(wtr);
  console.log('level coffee.water: ' + coffee.water);
  //coffee.beans = String(bns);
  //console.log('level JSON.stringify(coffee): ' + JSON.stringify(coffee));
  //console.log('water: ' + String(wtr));
  res.send(JSON.stringify(coffee));
});
