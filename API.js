const API = {
	"https://api.fex.net/api/v1/config/user": {
		"user": {
			"GDPR": false,
			"country": "US",
			"created_at": 1532431869000,
			"email": "u96387@fex.net",
			"first_name": "",
			"flags": 4,
			"has_email": true,
			"has_password": true,
			"id": 672636,
			"phone": "+19592650032",
			"priv": 0,
			"username": "u96387"
		}
	},

	"https://api.fex.net/api/v1/config/anonymous": {
		"anonymous": {
			"country": "UA",
			"currency": "UAH",
			"tariffs": [
				{
					"discount": 0,
					"id": 1,
					"name": "FEX Trial",
					"period": 15,
					"price": 15,
					"product": 0,
					"value": 10
				},
				{
					"discount": 9.5,
					"id": 2,
					"name": "FEX Plus",
					"period": 365,
					"price": 109.5,
					"product": 0,
					"value": 10
				},
				{
					"discount": 19,
					"id": 3,
					"name": "FEX Plus",
					"period": 730,
					"price": 219,
					"product": 0,
					"value": 10
				},
				{
					"discount": 147.5,
					"id": 4,
					"name": "FEX Plus",
					"period": 1825,
					"price": 547.5,
					"product": 0,
					"value": 10
				},
				{
					"discount": 30.5,
					"id": 5,
					"name": "FEX Plus",
					"period": 365,
					"price": 255.5,
					"product": 0,
					"value": 100
				},
				{
					"discount": 86,
					"id": 6,
					"name": "FEX Plus",
					"period": 730,
					"price": 511,
					"product": 0,
					"value": 100
				},
				{
					"discount": 216.5,
					"id": 7,
					"name": "FEX Plus",
					"period": 1095,
					"price": 766.5,
					"product": 0,
					"value": 100
				},
				{
					"discount": 0,
					"id": 8,
					"name": "FEX Plus",
					"period": 93,
					"price": 180,
					"product": 0,
					"value": 1024
				},
				{
					"discount": 0,
					"id": 9,
					"name": "FEX Plus",
					"period": 186,
					"price": 360,
					"product": 0,
					"value": 1024
				},
				{
					"discount": 70,
					"id": 10,
					"name": "FEX Plus",
					"period": 365,
					"price": 730,
					"product": 0,
					"value": 1024
				}
			]
		}
	},

	"https://api.fex.net/api/v1/config/billing": {
		"billing": {
			"currency": "USD",
			"licenses": [
				{
					"active_until_at": 1533734999000,
					"discount": 0,
					"id": 672667,
					"name": "FEX Trial",
					"price": 15,
					"product": 0,
					"value": 10
				}
			],
			"payment_card": null,
			"rebill_is_active": false,
			"tariffs": [
				{
					"discount": 0,
					"id": 41,
					"name": "FEX Trial",
					"period": 15,
					"price": 15,
					"product": 0,
					"value": 10
				},
				{
					"discount": 0.5,
					"id": 42,
					"name": "FEX Plus",
					"period": 365,
					"price": 4,
					"product": 0,
					"value": 10
				},
				{
					"discount": 1,
					"id": 43,
					"name": "FEX Plus",
					"period": 730,
					"price": 8,
					"product": 0,
					"value": 10
				},
				{
					"discount": 5,
					"id": 44,
					"name": "FEX Plus",
					"period": 1825,
					"price": 18.5,
					"product": 0,
					"value": 10
				},
				{
					"discount": 1,
					"id": 45,
					"name": "FEX Plus",
					"period": 365,
					"price": 8.5,
					"product": 0,
					"value": 100
				},
				{
					"discount": 3,
					"id": 46,
					"name": "FEX Plus",
					"period": 730,
					"price": 17,
					"product": 0,
					"value": 100
				},
				{
					"discount": 7.5,
					"id": 47,
					"name": "FEX Plus",
					"period": 1095,
					"price": 26,
					"product": 0,
					"value": 100
				},
				{
					"discount": 0,
					"id": 48,
					"name": "FEX Plus",
					"period": 93,
					"price": 6,
					"product": 0,
					"value": 1024
				},
				{
					"discount": 0,
					"id": 49,
					"name": "FEX Plus",
					"period": 186,
					"price": 12,
					"product": 0,
					"value": 1024
				},
				{
					"discount": 12.5,
					"id": 50,
					"name": "FEX Plus",
					"period": 365,
					"price": 24.5,
					"product": 0,
					"value": 1024
				}
			]
		}
	},

	"https://api.fex.net/api/v1/config": {
		"billing": {
			"currency": "USD",
			"licenses": [
				{
					"active_until_at": 1533734999000,
					"discount": 0,
					"id": 672667,
					"name": "FEX Trial",
					"price": 15,
					"product": 0,
					"value": 10,
					"is_trial": true
				}
			],
			"payment_card": null,
			"rebill_is_active": false,
			"tariffs": [
				{
					"discount": 0,
					"id": 41,
					"name": "FEX Trial",
					"period": 15,
					"price": 15,
					"product": 0,
					"value": 10,
					"is_trial": true
				},
				{
					"discount": 0.5,
					"id": 42,
					"name": "FEX Plus",
					"period": 365,
					"price": 4,
					"product": 0,
					"value": 10,
					"is_trial": false
				},
				{
					"discount": 1,
					"id": 43,
					"name": "FEX Plus",
					"period": 730,
					"price": 8,
					"product": 0,
					"value": 10,
					"is_trial": false
				},
				{
					"discount": 5,
					"id": 44,
					"name": "FEX Plus",
					"period": 1825,
					"price": 18.5,
					"product": 0,
					"value": 10,
					"is_trial": false
				},
				{
					"discount": 1,
					"id": 45,
					"name": "FEX Plus",
					"period": 365,
					"price": 8.5,
					"product": 0,
					"value": 100,
					"is_trial": false
				},
				{
					"discount": 3,
					"id": 46,
					"name": "FEX Plus",
					"period": 730,
					"price": 17,
					"product": 0,
					"value": 100,
					"is_trial": false
				},
				{
					"discount": 7.5,
					"id": 47,
					"name": "FEX Plus",
					"period": 1095,
					"price": 26,
					"product": 0,
					"value": 100,
					"is_trial": false
				},
				{
					"discount": 0,
					"id": 48,
					"name": "FEX Plus",
					"period": 93,
					"price": 6,
					"product": 0,
					"value": 1024,
					"is_trial": false
				},
				{
					"discount": 0,
					"id": 49,
					"name": "FEX Plus",
					"period": 186,
					"price": 12,
					"product": 0,
					"value": 1024,
					"is_trial": false
				},
				{
					"discount": 12.5,
					"id": 50,
					"name": "FEX Plus",
					"period": 365,
					"price": 24.5,
					"product": 0,
					"value": 1024,
					"is_trial": false
				}
			]
		},
		"user": {
			"GDPR": false,
			"country": "US",
			"created_at": 1532431869000,
			"email": "u96387@fex.net",
			"first_name": "",
			"flags": 4,
			"has_email": true,
			"has_password": true,
			"id": 672636,
			"phone": "+19592650032",
			"priv": 0,
			"username": "u96387"
		}
	}
};