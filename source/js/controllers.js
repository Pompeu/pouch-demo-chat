angular.module('starter.controllers', [])

  .controller('DashCtrl',function() {
  })

  .controller('ChatsCtrl',['$scope','Chats',function($scope, Chats) {

    $scope.chats = Chats.all();
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
