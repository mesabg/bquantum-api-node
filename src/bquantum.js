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
 * Testing
 */
class BQuantum {
	model = {   
		commerceSaleIdentifier: "143255",   
		description: "El mega pago",   
		ammount: {     
			currency: "COP",    
			valueMoney: 121300   
		},  
		additionalAmmount: {     
			currency: "COP",     
			valueMoney: 10000   
		},   
		additionalAmmountType: "TIP",   
		taxes: {     
			currency: "COP",     
			valueMoney: 12000   
		},   
		taxesReturnBase: {    
			currency: "COP",     
			valueMoney: 12000   
		},   
		client: {     
			documentType: "CC",     
			documentNumber: "8083068",     
			firstName: "Diego",     
			lastName: "Torres",     
			phoneNumber: "5713435353",     
			cellPhoneNumber: "573163547896",     
			email: "diego.torres.@fitideas.co",     
			gender: "F",     
			birthday: new Date(2017, 6, 4),     
			nationality: "CO",     
			billingDate: new Date(2017, 8, 1),    
			billingAddress: "fsfs",     
			billingCity: "Bogota",     
			billingCountry: {       
				isoCodeNumeric: "6"     
			}   
		},   
		commerce: {     
			commerceId: "001111"   
		}, 
		languageCode: "ES",   
		currency: "COP",
		informationHash: "",   
		returnURL: process.env.RETURN_URL,   
		confirmationURL: process.env.CONFIRMATION_URL, 
		paymentMethodsAllowed: [     
			"PSE_TYPE",     
			"CRB_TYPE"   
		],   
		crbFranchises: [     
			{       
				"code": "90"     
			},{       
				"code": "30"
			}
		]
	};


	constructor(){}


	generateHash(
		content = {
			commerceId: "001111",
			commerceSaleIdentifier: "143255",
			description: "El mega pago",
			ammount: 121300
		}, hashKey = "ww"){

		let hashContent = `${content.commerceId}${content.commerceSaleIdentifier}${content.description}${content.ammount}`;
		console.log("Hash content :: ", hashContent);
		let hash = CryptoJS.HmacSHA1(hashContent, hashKey);
		let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
		console.log("Hash generated :: ", hashInBase64);
		return hashInBase64;
	}

	updateHash(hashKey){
		//-- Generate Hash
		this.model.informationHash = this.generateHash({
			commerceId: this.model.commerce.commerceId,
			commerceSaleIdentifier: this.model.commerceSaleIdentifier,
			description: this.model.description,
			ammount: this.model.ammount.valueMoney
		}, hashKey);
		return this.model;
	}

	async payment(data, hashKey){
		
		try {

			//-- Generate Hash
			data.informationHash = this.generateHash({
				commerceId: data.commerce.commerceId,
				commerceSaleIdentifier: data.commerceSaleIdentifier,
				description: data.description,
				ammount: data.ammount.valueMoney
			}, hashKey);
	
			//-- Send Axios request
			let response = await axios.request({
				url: `createPayment`,
				method: 'post',
				baseURL: process.env.BQ_BASE_URL,
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

module.exports = BQuantum;