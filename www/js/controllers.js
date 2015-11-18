angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
  
  //Mostramos el token del dispositivo
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });
  
  
  // Identificamos al usuario con el servicio de Ionic al pulsar el boton
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    //Si no tenemos un user_id, generamos uno nuevo
    var user = $ionicUser.get();
    if(!user.user_id) {
      user.user_id = $ionicUser.generateGUID();
    };

    // Establecemos alguna información para nuestro usuario
    angular.extend(user, {
      name: 'Ivan',
      description: 'Fullstack Developer',
      location: 'Islas Canarias',
      website: 'http://ivanbtrujillo.com'
    });

    $scope.parrafo = "ivan";


    // Cuando tenemos todos los datos, nos identificamos contra el
    // Ionic User Service
    
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Usuario identificado: ' + user.name + '\n ID ' + user.user_id);
    });
  };
  
    // Registramos un dispositivo para recibir notificaciones PUSH
  $scope.pushRegister = function() {
    console.log('Registrando Para PUSH');

    // Lo registramos contra Ionic Service, los parametros son opcionales
    $ionicPush.register({
      canShowAlert: true, //Se pueden mostrar alertas en pantalla
      canSetBadge: true, //Puede actualizar badgeds en la app
      canPlaySound: true, //Puede reproducir un sonido
      canRunActionsOnWake: true, //Puede ejecutar acciones fuera de la app
      onNotification: function(notification) {
        // Cuando recibimos una notificacion, la manipulamos aqui
        alert(notification.message);
        return true;
      }
    });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
