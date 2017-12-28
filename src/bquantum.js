/**
 * BQuantum Test
 */

/**
 * Global dependencies
 */
const axios = require('axios');
const Promise = require('bluebird');
const CryptoJS = require('crypto-js');


/**
 * Local dependencies
 */
//-- JNDI in Java
const environment = {
    baseURL: process.env.BQ_BASE_URL
};

let testData = {   
	"commerceSaleIdentifier": "143255",   
	"description": "El mega pago",   
	"ammount": {     
		"currency": "COP",    
		"valueMoney": 121300   
	},  
	"additionalAmmount": {     
		"currency": "COP",     
		"valueMoney": 10000   
	},   
	"additionalAmmountType": "TIP",   
	"taxes": {     
		"currency": "COP",     
		"valueMoney": 12000   
	},   
	"taxesReturnBase": {    
		"currency": "COP",     
		"valueMoney": 12000   
	},   
	"client": {     
		"documentType": "CC",     
		"documentNumber": "8083068",     
		"firstName": "Diego",     
		"lastName": "Torres",     
		"phoneNumber": "5713435353",     
		"cellPhoneNumber": "573163547896",     
		"email": "diego.torres.@fitideas.co",     
		"gender": "F",     
		"birthday": new Date(2017, 6, 4),     
		"nationality": "CO",     
		"billingDate": new Date(2017, 8, 1),    
		"billingAddress": "fsfs",     
		"billingCity": "Bogota",     
		"billingCountry": {       
			"isoCodeNumeric": "6"     
		}   
	},   
	"commerce": {     
		"commerceId": "001111"   
	}, 
	"languageCode": "ES",   
	"currency": "COP",   
	"additionalData": {     
		"additionalProductData": "additionalProductData",     
		"tipo": "remanufacturado"   
	},   
	"informationHash": "n5FdH2tENM6TENXMjOWXJG9iXec=",   
	"returnURL": process.env.RETURN_URL,   
	"confirmationURL": process.env.CONFIRMATION_URL, 
	"paymentMethodsAllowed": [     
		"PSE_TYPE",     
		"CRB_TYPE"   
	],   
	"crbFranchises": [     
		{       
			"code": "90"     
		},{       
			"code": "30"
		}
	]
};


/**
 * Testing
 */
class BQuantum {
	constructor(){}

	async payment(commerceId, hashKey){
		let data = testData;
		
		try {
			//-- Save commerceId
			data.commerce = {};
			data.commerce.commerceId = commerceId;

			//-- Generate Hash
			let hashContent = `${data.commerce.commerceId}${data.commerceSaleIdentifier}${data.description}${data.ammount.valueMoney}`;
			console.log("Hash Content :: ", hashContent);
			let hash = CryptoJS.HmacSHA1(hashContent, hashKey);
			let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
			data.informationHash = hashInBase64;
			console.log("Information Hash :: ", data.informationHash);
	
			//-- Send Axios request
			let response = await axios.request({
				url: `createPayment`,
				method: 'post',
				baseURL: environment.baseURL,
				data: data
			});
			return response.data;
			
		} catch (reason) {
			console.log("An error ocurred :: ", reason);
			if (reason.response != undefined && reason.response != null)
				return reason.response.data;
			return {msg:'API call fail'};
		}
	}
};	

module.exports = new BQuantum();