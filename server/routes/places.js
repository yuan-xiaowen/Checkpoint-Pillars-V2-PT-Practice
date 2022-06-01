const express = require('express')
const router = express.Router();
const {
  models: { Place },
} = require('../db');

// Add your routes here:

router.get('/unassigned',async(req,res,next)=>{
   try{
       const unassigned = await Place.findCitiesWithNoParent()
       res.send(unassigned)
   }catch(err){
     next(err)
   }
})

router.get('/states',async(req,res,next)=>{
  try{
      const states = await Place.findStatesWithCities()
      res.send(states)
  }catch(err){
    next(err)
  }
})

router.delete('/:id',async(req,res,next)=>{
  try{
    const id = req.params.id
    const row = await Place.findByPk(id)
    if(row){
    await row.destroy()
    res.status(204).send()
    }else{
      res.status(404).send()
    }
  }catch(err){
    next(err)
  }
})

module.exports = router;
