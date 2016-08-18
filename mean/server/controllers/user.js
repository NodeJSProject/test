var todo = require('../models/user.js');

module.exports = function(app) {
    // select all
    app.get('/api/user', function(req, res) {
        todo.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // count all
    app.get('/api/user/count', function(req, res) {
        todo.count(function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // create
    app.post('/api/user', function(req, res) {
        var obj = new todo(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        });
    });

    // find by id
    app.get('/api/user/:id', function(req, res) {
        todo.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/api/user/:id', function(req, res) {
        todo.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/api/user/:id', function(req, res) {
        todo.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });
};