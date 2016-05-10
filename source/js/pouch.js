(function() {
  'use strict';
  angular.module('pouchdb')
    .service('$pouchdb', pouchdb);

  pouchdb.$inject = ['$rootScope'];

  function pouchdb ($rootScope) {
    var db;
    var chageListener;

    this.setDataBaseName = function(name) {
      db =  new PouchDB(name);
      return db;
    };

    this.startListening = function () {
      chageListener = db.changes({
        live : true,
        include_docs : true
      }).on('change', function (change) {
        $rootScope.$broadcast('$change', change);
      });
    };

    this.stopListening = function () {
      chageListener.stop();
    };

    this.save = function (json) {
      if (json.hasOwnProperty('id')) {
        return db.put(json);
      }
      return db.post(json);
    };

    this.get = function (id) {
      return db.get(id);
    };

    this.remove = function (id, rev) {
      return db.remove(id, rev);
    };

    this.getAll =function () {
      return db.allDocs({include_docs : true });
    };

  }
}());
