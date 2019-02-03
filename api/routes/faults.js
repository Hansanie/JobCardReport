const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');

const Fault = require('../models/fault');

router.get("/", (req, res, next)=> {
   Fault.find()
   .select("faultName _id")
   .exec()
   .then(docs => {
     const response = {
         count: docs.length,
         faults: docs.map(doc => {
             return {
                 faultName: doc.faultName,
                 _id: doc._id,
                 request:{
                     type: 'GET',
                     url:"http://localhost:3000/faults/" + doc._id
                 }
             }
         })
     };
        res.status(200).json(response);
    })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
});

router.post('/', (req, res, next)=> {
   const fault = new Fault({
        _id: new mongoose.Types.ObjectId(),
        faultName: req.body.faultName
    });
    fault
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message:'Created Fault Successfully',
            createdFault:{
                faultName: result.faultName,
                _id: result._id,
                request: {
                    trype: 'GET',
                    url: "http://localhost:3000/faults/" + result._id
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

router.get("/:faultId", (req, res, next)=>{
    const id = req.params.faultId;
    Fault.findById(id)
    .select('faultName _id')
    .exec()
    .then(doc => {
        console.log("From Database",doc);
        if(doc){
            res.status(200).json({
                fault: doc,
                request: {
                    type: 'GET',
                    //description: 'Get all products',
                    url: 'http://localhosts:3000/faults'
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

    module.exports = router;