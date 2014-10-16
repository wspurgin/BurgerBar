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
});

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
});

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
});

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
});

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
});

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
});

/**
* burger schema
*/

var burgerSchema = new Schema ({
	id {
		type: int,
		required: true
	},
	sauce {
		type: Schema.ObjectId,
		ref:'sauces',
		required: true
	},
	toppings {
		type: Schema.ObjectId,
		ref:'toppings',
		required: true
	},
	cheese {
		type: Schema.ObjectId,
		ref:'cheeses',
		required: true
	},
	buns {
		type: Schema.ObjectId,
		ref:'buns',
		required: true
	},
	meat {
		type: Schema.ObjectId,
		ref:'meat',
		required: true
	},
	price {
		type: float,
		required: true
	}
});

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
});

/**
* functions
*/

meatSchema.methods = {
	addToBurger: function(meat){},
	removeFromBurger: function(meat){}
}

bunsSchema.methods = {
	addToBurger: function(buns){},
	removeFromBurger: function(buns){}
}

cheesesSchema.methods = {
	addToBurger: function(cheese){},
	removeFromBurger: function(cheese){}
}

toppingsSchema.methods = {
	addToBurger: function(topping){},
	removeFromBurger: function(topping){}
}

saucesSchema.methods = {
	addToBurger: function(sauce){},
	removeFromBurger: function(sauce){}
}

sidesSchema.methods = {
	addToOrder: function(sideItem){},
	removeFromOrder: function(sideItem){}
}

burgerSchema.methods = {
	addToOrder: function(burger){},
	removeFromOrder: function(burger){},
	viewAttributes: function(burger){},
	clearAttributes: function(burger){}
}

orderSchema.methods = {
	cancelOrder: function(order){},
	submitOrder: function(order){}
}