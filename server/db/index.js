const { sync } = require('./db');
const db = require('./db');
const Place = require('./Place');
const seed = require('./seed');

// If we were to create any associations between different tables
// this would be a good place to do that:

// const init = async()=>{
//    manhatten.parentId = NYS.id
//    await manhatten.save()
//    brooklyn.parentId = NYS.id
//    await brooklyn.save()
// }

// init()



module.exports = {
  db,
  seed,
  models: {
    Place
  },
};
