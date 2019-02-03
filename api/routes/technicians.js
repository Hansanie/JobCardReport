const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');


const Technician = require('../models/technician');

router.post('/',(req, res, next)=> {
   
    const technician = new Technician({
        _id: new mongoose.Types.ObjectId(),
        regNo: req.body.regNo,
        name: req.body.name,
        empType: req.body.empType,
        department: req.body.department,
        telNo: req.body.telNo,
    });
    technician
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message:'Created Technician Successfully',
            createdTechnician:{
                regNo: result.regNo,
                name: result.name,
                empType: result.empType,
                department: result.department,
                telNo: result.telNo,

                _id: result._id,
                request: {
                    trype: 'GET',
                    url: "http://localhost:3000/technicians/" + result._id
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    } );
});


router.get('/technicians', function(req, res) {
    console.log('Get all technician details');
    Technician.find({}) 
    .exec(function(err,technicians){
        if(err){
            console.log("Error");
        } else {
            res.json(technicians);
        }
    });
  });

  router.get('/technicians/:id', function(req, res) {
    console.log('Get a technician details');
    Technician.findById(req.params.id) 
    .exec(function(err,technician){
        if(err){
            console.log("Error");
        } else {
            res.json(technician);
        }
    });
  });
  
  module.exports = router;