// Get the Compliment model.
var Compliment = require('../models/compliment');
// Get the User model.
var User = require('../models/user');

var express = require('express');

module.exports = function(app) {
    'use strict';

    var api = express.Router();
    
    // Middleware to use for all requests.
    api.use(function(req, res, next) {
        console.log('Something is happening.');
        next();
    });

    // For routes that end in /compliments.
    api.route('/compliments')

        // Create a compliment.
        .post(function(req, res) {
		
            var compliment = new Compliment();
            compliment.author = req.body.author;
            compliment.body = req.body.body;
            compliment.date = req.body.date;

            compliment.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Compliment created!' });
            });
        })

        // Get all the compliments.
        .get(function(req, res) {
            Compliment.find(function(err, compliments) {
                if (err)
                    res.send(err);

                res.json(compliments);
            });
        });

    // For routes that end in /compliments/:compliment_id.
    api.route('/compliments/:compliment_id')

        // Get the compliment with that id.
        .get(function(req, res) {
            Compliment.findById(req.params.compliment_id, function(err, compliment) {
                if (err)
                    res.send(err);

                res.json(compliment);
            });
        })

        // Update the compliment with this id.
        .put(function(req, res) {
            Compliment.findById(req.params.compliment_id, function(err, compliment) {

                if (err)
                    res.send(err);

                compliment.author = req.body.author;
                compliment.body = req.body.body;
                compliment.date = req.body.date;

                compliment.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Compliment updated!' });
                });
            });
        })

        // Delete the compliment with this id.
        .delete(function(req, res) {
            Compliment.remove({
                _id: req.params.compliment_id
            }, function(err, compliment) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    // For routes that end in /users.
    api.route('/users')
        // Get all the users.
        .get(function(req, res) {
            User.find(function(err, users) {
                if (err)
                    res.send(err);

                res.json(users);
            });
        });

    return api;
}();
