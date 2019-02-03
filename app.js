const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jobRoutes = require('./api/routes/jobs');
const reasonRoutes = require('./api/routes/reasons');
const faultRoutes = require('./api/routes/faults');
const machineRoutes = require('./api/routes/machines');
const technicianRoutes = require('./api/routes/technicians');

mongoose.connect('mongodb://admin:admin123@ds135724.mlab.com:35724/jobcardsystem');


mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Autherization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/jobs', jobRoutes);
app.use('/reasons', reasonRoutes);
app.use('/faults',faultRoutes);
app.use('/machines', machineRoutes);
app.use('/technicians', technicianRoutes);

app.use((req, res, next)=> {
     const error = new Error('Not Found');
     error.status=404;
     next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;