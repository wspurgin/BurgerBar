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
		type: Number,
		required: true
	}
});

/**
* bun schema 
*/
var bunsSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

/**
* cheese schema 
*/
var cheesesSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

/**
* topping schema 
*/
var toppingsSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

/**
* sauce schema 
*/
var saucesSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

/**
* side schema 
*/
var sidesSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

/**
* burger schema
*/

var burgerSchema = new Schema ({
	sauce: {
		type: Schema.ObjectId,
		ref:'sauces',
		required: false
	},
	toppings: {
		type: Schema.ObjectId,
		ref:'toppings',
		required: false
	},
	cheese: {
		type: Schema.ObjectId,
		ref:'cheeses',
		required: false
	},
	buns: {
		type: Schema.ObjectId,
		ref:'buns',
		required: true
	},
	meat: {
		type: Schema.ObjectId,
		ref:'meat',
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

/**
* order schema
*/
var orderSchema = new Schema ({
	timePlaced: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref:'User',
		required: true
	},
	mainItems: {
		type: Array,
		required: true
	},
	sideItems: {
		type: Array,
		required: false
	}
});

mongoose.model('Order', orderSchema);
mongoose.model('Burger', burgerSchema);
mongoose.model('Side', sidesSchema);
mongoose.model('Sauce', saucesSchema);
mongoose.model('Topping', toppingsSchema);
mongoose.model('Cheese', cheesesSchema);
mongoose.model('Bun', bunsSchema);
mongoose.model('Meat', meatSchema);
