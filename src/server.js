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
    let BQ = new BQuantum();

    //-- Form test data
    let formData = {
        commerceSaleIdentifier: BQ.model.commerceSaleIdentifier,
        description: BQ.model.description,
        currency: BQ.model.ammount.currency,
        ammount: BQ.model.ammount.valueMoney,
        additionalAmmount: BQ.model.additionalAmmount.valueMoney,
        taxes: BQ.model.taxes.valueMoney,
        taxesReturnBase: BQ.model.taxesReturnBase.valueMoney,
        documentNumber: BQ.model.client.documentNumber,
        firstName: BQ.model.client.firstName,
        lastName: BQ.model.client.lastName,
        phoneNumber: BQ.model.client.phoneNumber,
        cellPhoneNumber: BQ.model.client.cellPhoneNumber,
        email: BQ.model.client.email,
        gender: BQ.model.client.gender,
        birthday: BQ.model.client.birthday,
        nationality: BQ.model.client.nationality,
        billingDate: BQ.model.client.billingDate,
        billingAddress: BQ.model.client.billingAddress,
        billingCity: BQ.model.client.billingCity,
        languageCode: BQ.model.languageCode,
        commerceId: BQ.model.commerce.commerceId,
        hashKey: "ww"
    };

    let form = Object.keys(formData).map((key) => {
        return {
            name: key,
            value: formData[key],
            type: typeof formData[key]
        };
    });

    response.status(200);
    response.render('index', {
        form: form
    });
});


//-- Payment route
app.post('/pay', async (request, response, next) => {
    console.log("Before payment...");
    let BQ = new BQuantum();
    let hashKey = request.body.hashKey;
    BQ.model = request.body.data;

    BQ.model.ammount.valueMoney = parseFloat(BQ.model.ammount.valueMoney);
    BQ.model.additionalAmmount.valueMoney = parseFloat(BQ.model.additionalAmmount.valueMoney);
    BQ.model.taxes.valueMoney = parseFloat(BQ.model.taxes.valueMoney);
    BQ.model.taxesReturnBase.valueMoney = parseFloat(BQ.model.taxesReturnBase.valueMoney);
    BQ.model.client.birthday = new Date(BQ.model.client.birthday);
    BQ.model.client.billingDate = new Date(BQ.model.client.billingDate);

    //-- BQ payment
    let paymentResponse = await BQ.payment(request.body.data, request.body.hashKey);
    response.status(200).json(paymentResponse);
});


//-- Get Initial JSON
app.get('/data', async (request, response, next) => {
    let BQ = new BQuantum();
    response.status(200).json(BQ.updateHash());
});


//-- Post update JSON
app.post('/data', async (request, response, next) => {
    let BQ = new BQuantum();

    BQ.model.commerceSaleIdentifier = request.body.commerceSaleIdentifier;
    BQ.model.description = request.body.description;
    BQ.model.ammount.currency = request.body.currency;
    BQ.model.additionalAmmount.currency = request.body.currency;
    BQ.model.taxes.currency = request.body.currency;
    BQ.model.taxesReturnBase.currency = request.body.currency;
    BQ.model.currency = request.body.currency;
    BQ.model.ammount.valueMoney = parseFloat(request.body.ammount);
    BQ.model.additionalAmmount.valueMoney = parseFloat(request.body.additionalAmmount);
    BQ.model.taxes.valueMoney = parseFloat(request.body.taxes);
    BQ.model.taxesReturnBase.valueMoney = parseFloat(request.body.taxesReturnBase);
    BQ.model.client.documentNumber = request.body.documentNumber;
    BQ.model.client.firstName = request.body.firstName;
    BQ.model.client.lastName = request.body.lastName;
    BQ.model.client.phoneNumber = request.body.phoneNumber;
    BQ.model.client.cellPhoneNumber = request.body.cellPhoneNumber;
    BQ.model.client.email = request.body.email;
    BQ.model.client.gender = request.body.gender;
    BQ.model.client.birthday = new Date(request.body.birthday);
    BQ.model.client.nationality = request.body.nationality;
    BQ.model.client.billingDate = new Date(request.body.billingDate);
    BQ.model.client.billingAddress = request.body.billingAddress;
    BQ.model.client.billingCity = request.body.billingCity;
    BQ.model.commerce.commerceId = request.body.commerceId;
    BQ.model.languageCode = request.body.languageCode;

    response.status(200).json(BQ.updateHash(request.body.hashKey));
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