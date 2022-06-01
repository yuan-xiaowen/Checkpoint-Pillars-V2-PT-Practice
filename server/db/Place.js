const Sequelize = require('sequelize');
const db = require('./db');

const Place = db.define('place', {
    place_name:{
        type:Sequelize.STRING,
        unique:true,
        allowNull: false,
        validate: {
            notEmpty: true
          }
    },
    category:{
        type:Sequelize.ENUM,
        defaultValue:'STATE',
        allowNull: false,
        values: ['CITY','STATE','COUNTRY']
    },
    isState:{
        type:Sequelize.VIRTUAL,
        get() {
         return `${this.category}`=== 'STATE';
        }
    },
    nickname:{
        type:Sequelize.VIRTUAL,
        get() {
          let arr = `${this.place_name}`.split(' ')
          let len = arr.length
          let str=''
          for(let i =0;i<len;i++){
            str=str+arr[i][0].toUpperCase()
          }
         return str;
        }
    }
});

Place.findCitiesWithNoParent = function () { 
    return  Place.findAll({
        where:{
            parentId:null,
            category:'CITY'
        }
    })
  };

Place.findStatesWithCities = function () { 
    return  Place.findAll({
        where:{   
            category:'STATE'
        },
        include: [
            { model: Place, as: 'children' }]
    })
  }; 



/**
 * We've created the association for you!
 *
 * A place can be related to another place:
 *       NY State (parent)
 *         |
 *       /   \
 *     NYC   Albany
 * (child)  (child)
 *
 * You can find the parent of a place and the children of a place 
 */

Place.belongsTo(Place, { as: 'parent' });
Place.hasMany(Place, { as: 'children', foreignKey: 'parentId' });

module.exports = Place;
