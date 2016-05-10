angular.module('starter.services', ['pouchdb'])
  .factory('Chats',['$pouchdb', function($pouchdb) {

    return {
      all: function all() {
        return $pouchdb.getAll();
      },
      get: function get(id) {
        return $pouchdb.get(id);
      },
      add : function add (user) {
        return $pouchdb.save(user);
      }
    };
  }]);
