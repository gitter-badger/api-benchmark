var _ = require('underscore');

module.exports = function(benchmarkRunner){

  this.runner = new benchmarkRunner.Suite;

  return _.extend(this, {
    emitError: function(error){
      this.runner.emit('error', error);
    },
    onError: function(callback){
      this.runner.on('error', function(event, error){
        callback(error);
      });
    },
    onComplete: function(callback){
      this.runner.on('complete', function() {
        this.fasterName = this.filter('fastest').pluck('name');
        callback(this);
      });
    },
    onCycle: function(callback){
      this.runner.on('cycle', function(event) {
        callback(event);
      });
    },
    add: function(suiteName, options, callback){
      this.runner.add(suiteName, function(deferred){
        callback(function(){
          deferred.resolve();
        });
      }, _.extend(options, { defer: true }));
    },
    run:function(){
      this.runner.run({ async: true });
    }
  });
};