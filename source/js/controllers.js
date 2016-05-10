angular.module('starter.controllers', [])

  .controller('DashCtrl',['Chats','$state','$window', function(Chats, $state, $window) {
    var vm = this;
    vm.join = function (name) {
      if (name && name.length < 4) {
        return vm.message = 'use 5 or more carater for name';
      }
      var user = {
        _id        : new Date().toISOString(),
        name       : vm.name,
        face       : 'img/default.png'
      };
      Chats.add(user).then(function () {
        $window.localStorage.setItem('user', JSON.stringify(user));
        vm.go();
      })
      .catch(function (err) {
        alert(err);
      });
      vm.message = '';
    };
    vm.go = function () {
      $state.go('tab.chats');
    };
  }])

  .controller('ChatsCtrl',['$scope','Chats','$window', function($scope, Chats, $window) {
    var localUser = JSON.parse($window.localStorage.getItem('user'));
    $scope.$on('$ionicView.enter', function () {
      Chats.all().then(function (user) {
        $scope.chats = user.rows.filter(function (doc) {
          return doc.id !== localUser._id;
        }).map(function (doc) { 
          return doc.doc;
        });
        $scope.$digest();
      });
    });
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }])

  .controller('ChatDetailCtrl',['$scope','$stateParams','Chats','$rootScope', function($scope, $stateParams, Chats, $rootScope) {
    $scope.messages = [];
    $scope.user = new Date().toISOString();
    $scope.other = $stateParams.chatId;
    $scope.$on('$ionicView.enter', function () {
      Chats.get($stateParams.chatId).then(function (doc) {
        $scope.chat = doc; 
        $scope.$digest();
      });
    });

    $scope.conversations = {
      _id : [$scope.user, $scope.other].join().replace(',','-'),
      messages : [],
      timeistamp : new Date().toISOString()
    };


    $scope.sendMessage = function (ev, msg) {
      if (typeof ev === 'string'){
        msg = ev;
        $scope.conversations.messages.push(msg);
      } else if (ev.which === 13) {
        $scope.conversations.messages.push(msg);
      }
      $scope.message = '';
    };

  }])

  .controller('AccountCtrl',['$scope', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  }]);
