(function() {
  'use strict';

  angular.module('starter.run', ['pouchdb'])
    .run(['$pouchdb',function ($pouchdb) {
      $pouchdb.setDataBaseName('users');
    }]);
}());
