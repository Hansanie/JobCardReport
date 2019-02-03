const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');


const Machine = require('../models/machine');

router.get("/", (req, res, next)=> {
    Machine.find()
    .select('department location serialNo _id')
    //.populate('reason fault')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            machines: docs.map(doc => {
                return {
                    _id: doc._id,
                    serialNo: doc.serialNo,
                    department: doc.department,
                    location: doc.location,
                    request: {
                        type: 'GET',
                        url:'http://localhost:3000/machines/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
});

router.get('/machines', function(req, res) {
    console.log('Get all machine details');
    Machine.find({}) 
    .exec(function(err,machines){
        if(err){
            console.log("Error");
        } else {
            res.json(machines);
        }
    });
  });

  router.get('/machines/:id', function(req, res) {
    console.log('Get a machine details');
    Machine.findById(req.params.id) 
    .exec(function(err,machine){
        if(err){
            console.log("Error");
        } else {
            res.json(machine);
        }
    });
  });
 
router.post('/',(req, res, next)=> {
   
    const machine = new Machine({
        _id: new mongoose.Types.ObjectId(),
        serialNo: req.body.serialNo,
        department: req.body.department,
        location: req.body.location
    });
    machine
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message:'Created Machine Successfully',
            createdMachine:{
                serialNo: result.serialNo,
                department: result.department,
                location: result.location,
                _id: result._id,
                request: {
                    trype: 'GET',
                    url: "http://localhost:3000/machines/" + result._id
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

router.get("/:machineId", (req, res, next)=>{
    const id = req.params.machineId;
    Machine.findById(id)
    .select('serialNo department location _id')
    //.populate('job')
    .exec()     
    .then(doc => {
        console.log("From Database",doc);
        if(doc){
            res.status(200).json({
                machine: doc,
                request: {
                    type: 'GET',
                    //description: 'Get all products',
                    url: 'http://localhosts:3000/machines'
                }
            })
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided Id'
            });
        }
   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
        });
    });

    /*router.patch('/:machineId', (req, res, next)=>{
        const id = req.params.machineId;
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propDepartment] = ops.value;
        }
        Machine.update({_id: id},{$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                
             message: "Machine updated",
             request: {
                 type: 'GET',
                 url: 'http://localhost:3000/machines/' + id
             }
            });
        })
        .catch(err => {
         console.log(err);
         res.status(500).json({
             error: error
         });
        });
     });*/

     router.delete('/:machineId', (req, res, next)=>{
        const id = req.params.machineId;
       Machine.remove({_id: id})
       .exec()
       .then(result => {
           res.status(200).json({
               message: "machine deleted",
               request:{
                   type: 'POST',
                   url: 'http://localhost:3000/machines',
                   body: { serialNo: 'String', department: 'String', location: 'String'}
               }
           });
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error:err
           });
       });
    });


module.exports = router;