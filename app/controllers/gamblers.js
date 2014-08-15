'use strict';
var Gambler = require('../models/gambler');

exports.init = function(req, res){
  res.render('gamblers/init');
};

exports.create = function(req, res){
  var gambler = new Gambler(req.body);
  gambler.save(function(){
    res.redirect('/gamblers');
  });
};

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.show = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    res.render('gamblers/show', {gambler:gambler});
  });
};
