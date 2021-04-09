'use strict'
var NRP    = require('node-redis-pubsub');
var config = {
  port  : 6378 , // Port of  the Redis server
  scope : 'cli'  
};

var nrp = new NRP(config)
