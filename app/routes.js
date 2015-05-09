// Get the Compliment model.
var Compliment = require('./models/compliment');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/compliments', function(req, res) {
            // use mongoose to get all compliments in the database
            Compliment.find(function(err, compliments) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(compliments); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        app.get('/test', function(req, res) {
            res.json({ message: 'YAY it worked!' });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });


    };
