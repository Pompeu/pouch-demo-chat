angular.module('starter.controllers', [])

  .controller('DashCtrl',['Chats','$state','$rootScope', function(Chats, $state, $rootScope) {
    var vm = this;
    vm.join = function (name) {
      if (name && name.length < 4) {
        return vm.message = 'use 5 or more carater for name';
      }
      $rootScope.name = name;
      Chats.add({
        name : vm.name,
        timeistamp : Date.now(),
        face: 'img/default.png'
      });
      vm.message = '';
      vm.go();
    };
    vm.go = function () {
      $state.go('tab.chats');
    };
  }])

  .controller('ChatsCtrl',['$scope','Chats','$rootScope',function($scope, Chats, $rootScope) {
    $scope.$on('$ionicView.enter', function () {
      $scope.chats = Chats.all().filter(function (chat) {
        return chat.name !== $rootScope.name;
      });
    });
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }])

  .controller('ChatDetailCtrl',['$scope','$stateParams','Chats', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  }])

  .controller('AccountCtrl',['$scope', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  }]);
