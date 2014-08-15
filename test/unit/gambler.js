/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'the-derby-test',
    Mongo     = require('mongodb');

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var g = new Gambler();
      expect(g).to.be.instanceof(Gambler);
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a gambler by its id', function(done){
      Gambler.findById(Mongo.ObjectID('000000000000000000000002'), function(gambler){
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Mr. Green');
        done();
      });
    });
  });
  describe('.deleteById', function(){
    it('should delete a gambler by its id', function(done){
      Gambler.deleteById(Mongo.ObjectID('000000000000000000000002'), function(gambler){
        Gambler.all(function(err, gamblers){
          expect(gamblers).to.have.length(2);
          done();
        });
      });
    });
  });
  describe('#save', function(){
    it('should save a new gambler to the database', function(done){
      var g = new Gambler();
      g.save(function(){
        expect(g._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  //Last braces
});

