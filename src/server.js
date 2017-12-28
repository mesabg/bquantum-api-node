/**
 * Global dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const BQuantum = require('./bquantum');

//-- Server
const app = express();
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());


//-- Handle some routes

//-- Test route
app.get('/', async (request, response, next) => {
    response.status(200).send('Tester is working properly');
});


//-- Payment route
app.get('/pay', async (request, response, next) => {
    console.log("Before payment");
    let bqResponse = await BQuantum.payment("001111", "ww");
    console.log("After payment");
    console.log("Response is :: ", bqResponse);
    response.status(200).json(bqResponse);
});


//-- Return URL
app.use('/return', async (request, response, next) => {
    console.log("Return URL triggered");
    console.log("Request is ", request);
    response.status(200).send('Everything is great');
});


//-- Confirmation URL
app.use('/confirmation', async (request, response, next) => {
    console.log("Confirmation URL triggered");
    console.log("Request is ", request);
    response.status(200).send('Everything is great');
});


// Run Express server, on right port
app.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
})