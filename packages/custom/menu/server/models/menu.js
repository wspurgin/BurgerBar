'use strict';

/**
* Module dependencies
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* meat sub-menu schema
*/
var meatSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	price : {
		type: float,
		required: true
	}
})

/**
* bun schema 
*/
var bunsSchema = new Schema ({
	name {
		type: String,
		required: true
	},
	price {
		type: float,
		required: true
	}
})

/**
* cheese schema 
*/
var cheesesSchema = new Schema ({
	name {
		type: String,
		required: true
	},
	price {
		type: float,
		required: true
	}
})

/**
* topping schema 
*/
var toppingsSchema = new Schema ({
	name {
		type: String,
		required: true
	},
	price {
		type: float,
		required: true
	}
})

/**
* sauce schema 
*/
var saucesSchema = new Schema ({
	name {
		type: String,
		required: true
	},
	price {
		type: float,
		required: true
	}
})

/**
* side schema 
*/
var sidesSchema = new Schema ({
	name {
		type: String,
		required: true
	},
	price {
		type: float,
		required: true
	}
})

/**
* order schema
*/
var orderSchema = new Schema ({
	id {
		type: int,
		required: true
	},
	timeplaced {
		type: Date,
		default: Date.now
	},
	user {
		type: Schema.ObjectId,
		ref:'User',
		required: true
	}
})