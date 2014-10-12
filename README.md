BurgerBar
=========

A collaborative repository for the BurgerBar App


## Installation Steps

After cloning this repo you will have to run an `npm install`

Assuming this app is cloned into the the directory `BurgerBar`, then after switching into that directory via the shell you simple write:
`npm install && bower install`

This will handle installing all the node modules required by MEAN, and it will install what bower Frontend components are needed as well (if they aren't already installed through npm).

After that, to have a truly working app, you will need to make a config file. Under `config/env/` you will need to create an `all.js` in that file, copy the provided template found in `all.js.template` filling in your proper config settings.

Then you're good to go!
