'use strict';

var Mongo = require('mongodb'),
    _ = require('lodash');

function Gambler(o){
  this.results = this.results || {wins:'0', losses: '0'};
  this.isDivorced = false;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, obj){
    var gambler = changePrototype(obj);

    cb(gambler);
  });
};

Gambler.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findAndRemove({_id:_id}, cb);
};

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

module.exports = Gambler;

function changePrototype(obj){
  return _.create(Gambler.prototype, obj);
}
