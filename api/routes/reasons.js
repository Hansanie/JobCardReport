const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');

const Reason = require('../models/reason');

router.get("/", (req, res, next)=> {
    Reason.find()
    .select("reasonDescription _id")
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
          reasons: docs.map(doc => {
              return {
                  reasonDescription: doc.reasonDescription,
                  _id: doc._id,
                  request:{
                      type: 'GET',
                      url:"http://localhost:3000/reasons/" + doc._id
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
   
    const reason = new Reason({
        _id: new mongoose.Types.ObjectId(),
        reasonDescription: req.body.reasonDescription
    });
    reason
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message:'Created Reason Successfully',
            createdReason:{
                reasonDescription: result.reasonDescription,
                _id: result._id,
                request: {
                    trype: 'GET',
                    url: "http://localhost:3000/reasons/" + result._id
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

router.get("/:reasonId", (req, res, next)=>{
    const id = req.params.reasonId;
    Reason.findById(id)
    .select('reasonDescription _id')
    .exec()
    .then(doc => {
        console.log("From Database",doc);
        if(doc){
            res.status(200).json({
                reason: doc,
                request: {
                    type: 'GET',
                    //description: 'Get all products',
                    url: 'http://localhosts:3000/reasons'
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