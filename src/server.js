/**
 * Global dependencies
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

//-- Local dependencies
const BQuantum = require('./bquantum');

//-- Server
const app = express();

//-- Server config
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


//-- Server routes

//-- Display form and data
app.get('/', async (request, response, next) => {
    response.status(200);
    response.render('index');
});


//-- Payment route
app.get('/pay', async (request, response, next) => {
    /*console.log("Before payment");
    let bqResponse = await BQuantum.payment("001111", "ww");
    console.log("After payment");
    console.log("Response is :: ", bqResponse);
    response.status(200).json(bqResponse);


    //-- Generate test values
    let formData = {
        merchantId: "611460",
        accountId: "614429",
        description: "Some random description",
        referenceCode: "002",
        amount: "10000.00",
        tax: "0.00",
        taxReturnBase: "0.00",
        shipmentValue: "0.00",
        currency: "COP",
        lng: "es",
        buttonType: "SIMPLE",
        responseUrl: process.env.RETURN_URL,
        confirmationUrl: process.env.CONFIRMATION_URL,
        urlOrigen: ''
    };

    let signature = Payulatam.generateSign(formData.merchantId, formData.referenceCode, formData.amount, formData.currency);
    formData.signature = signature;

    let data = [];
    Object.keys(formData).forEach((key) => {
        data.push({
            name: key,
            value: formData[key]
        });
    });
 
    //-- Render response
    response.status(200);
    response.render('form', {
        data: data
    });*/
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