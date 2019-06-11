var app = angular.module('myapp', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: './angAssess_views/register.html',
        controller: "registerController"
    });

    $routeProvider.when('/reply/:sender', {
        templateUrl: './angAssess_views/reply.html',
        controller: "replyController",
        resolve: ['authService', function (authService) {
            return authService.validate()
        }]
    });

    $routeProvider.when('/Register', {
        templateUrl: './angAssess_views/register.html',
        controller: "registerController"
    });

    $routeProvider.when('/Login', {
        templateUrl: './angAssess_views/login.html',
        controller: "loginController"
    });
    $routeProvider.when('/Logout', {
        templateUrl: 'angAssess_views/login.html',
        controller:'logout'

    });

    $routeProvider.when('/Home', {
        templateUrl: './angAssess_views/home.html',
        controller: 'homeController',
        resolve: ['authService', function (authService) {
            return authService.validate()
        }]

    });
    $routeProvider.when('/Message', {
        templateUrl: './angAssess_views/message.html',
        controller: "messageController",
        resolve: ['authService', function (authService) {
            return authService.validate()
        }]
    });
    $routeProvider.when('/Message/:id', {
        templateUrl: 'angAssess_views/message_detail.html',
        controller: "messageDetailController",
        resolve: ['authService', function (authService) {
            return authService.validate()
        }]
    });

});
app.factory('authService', function ($window, $location) {
    return {
        validate: function () {
            if (!($window.localStorage.getItem("isLoggedIn"))) {


                $location.path(['/Login']);
            }
        }
    }


});




app.directive('navigation', function ($compile) {
    var directive = {};
    directive.restrict = 'E';


    directive.compile = function (element, attributes) {


        var linkFunction = function ($scope, element, attributes) {
            element.html("<nav > <ul ><li ng-hide=" + $scope.isLoggedIn + "><a href='#/Register'>Register</a></li><li ng-hide=" + $scope.isLoggedIn + "><a href='#/Login'>Login</a></li><li ng-show=" + $scope.isLoggedIn + "><a href='#/Home'>Home</a></li><li ng-show=" + $scope.isLoggedIn + "><a href='#/Message'>Message</a></li><li ng-show=" + $scope.isLoggedIn + "><a href='#/Logout'>Logout</a></li></ul></nav>");
            $compile(element.contents())($scope);
        }
        return linkFunction;
    }

    return directive;
});

/*  var user_array = [];
var message1 = [
    { "message": "hello 1st message", "id": 1, "markAsImp": false,"Sender":"123" },
    { "message": "hello 2nd message", "id": 2, "markAsImp": false,"Sender":"123" },
    { "message": "hello 3rd message", "id": 3, "markAsImp": false ,"Sender":"123"},
    { "message": "hello 4th message", "id": 4, "markAsImp": false ,"Sender":"123"},
    { "message": "hello 5th message", "id": 5, "markAsImp": false ,"Sender":"123"}
];

var message2 = [
    { "message": "hello 1st message 2nd user", "id": 1, "markAsImp": false,"Sender":"abc" },
    { "message": "hello 2nd message 2nd user", "id": 2, "markAsImp": false,"Sender":"abc" },
    { "message": "hello 3rd message 2nd user", "id": 3, "markAsImp": false,"Sender":"abc" },
    { "message": "hello 4th message 2nd user", "id": 4, "markAsImp": false,"Sender":"abc" },
    { "message": "hello 5th message 2nd user", "id": 5, "markAsImp": false ,"Sender":"abc"}
];  */
app.controller('initial', function ($scope, $location, $window) {
/*  if($window.localStorage.getItem("users")==null&&$window.localStorage.getItem("message_abc")==null&&$window.localStorage.getItem("message_123")==null)
{
    user_array.push({ username: "abc", password: "def" });
    user_array.push({ username: "123", password: "456" });
    $window.localStorage.setItem("users", JSON.stringify(user_array));
    $window.localStorage.setItem("message_abc", JSON.stringify(message1));
    $window.localStorage.setItem("message_123", JSON.stringify(message2));

}  */
    

});

app.controller('homeController', function ($scope) {

    $scope.isLoggedIn = true;

});
app.controller('logout', function ($scope,$window) {

    $window.localStorage.setItem("isLoggedIn", "false");



});



app.controller('registerController', function ($scope, $window, $location,$http,$httpParamSerializerJQLike) {
    $scope.isLoggedIn = false;
   
    $scope.register =async function () {
      
           
            var user = {
                "username":$scope.username,
                "password":$scope.password
            }
           
            var config={
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
           
     await $http.post("http://localhost:3000/Register",$httpParamSerializerJQLike(user),config).then((data)=>
         {
             if(data!=null)
             {
                 alert('Successfully registered')
                $location.path(['/Login']);
             }
            
        }).catch(()=>{console.log("Error!!")});
        
       
    
       
    

    }
});
app.controller('loginController', function ($scope,$rootScope, $window, $location,$http,$httpParamSerializerJQLike) {
    
    $scope.login = async function () {

        var user = {
            "username":$scope.username,
            "password":$scope.password
        }
        var config={
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }

        await $http.post("http://localhost:3000/Login",$httpParamSerializerJQLike(user),config).then((data)=>
        {
           
          if(data.data=='Found')
          {$window.localStorage.setItem("user", JSON.stringify($scope.username));
          $window.localStorage.setItem("isLoggedIn", true);
          $rootScope.username=$scope.username;
         $location.path(['/Home']);}
         else if(data.data=='Empty')
         {
             alert('Credentials did not match!!')
         }
            
       }).catch(()=>{console.log("Error!!")});
       

      

    }
});

app.controller('messageController', function ($scope, $location, $http, $window, $rootScope,$route,$httpParamSerializerJQLike) {

    $scope.isLoggedIn = true;
    var config={
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
   
   $http.get("http://localhost:3000/api/messages/Messages/",{params:{user:JSON.parse($window.localStorage.getItem("user"))}} ).then((data)=>
    {
      if(data!=null)
      {
        $scope.messages=data.data;
      }
      
   }).catch((err)=>{console.log("Error!!")}); 

   $scope.markAsImportant = function (index) {
        
    var config={
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    $http.get("http://localhost:3000/api/messages/Messages/markAsImportant",{params:{"index":index,"user":JSON.parse($window.localStorage.getItem("user"))}} ).then((data)=>
    {
      if(data!=null)
      {
        $route.reload();
      }
      
   }).catch((err)=>{console.log("Error!!")}); 

}




   

});

app.controller('messageDetailController', function ($scope, $location,$route, $routeParams,$httpParamSerializerJQLike, $http, $window, $rootScope) {

    $scope.isLoggedIn = true;
    var id = $routeParams.id;
    $rootScope.message="hello";
   $http.get("http://localhost:3000/api/messages/Message/",{params:
    {"id":id,"user":JSON.parse($window.localStorage.getItem("user"))}
    
} ).then( (data)=>
    {
      if(data!=null)
      {
          
        $rootScope.message= data.data;
      
      }
      
   }).catch((err)=>{console.log("Error!!")}); 
  
   $scope.markAsImp = function () {
        
    var config={
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
   // console.log(id);
    $http.get("http://localhost:3000/api/messages/Messages/markAsImportant",{params:{"index":id,"user":JSON.parse($window.localStorage.getItem("user"))}} ).then((data)=>
    {
      if(data!=null)
      {
        $route.reload();
      }
      
   }).catch((err)=>{console.log("Error!!")});
   
   

}
$scope.delete = function () {
        
    var config={
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
   // console.log(id);
    $http.get("http://localhost:3000/api/messages/deleteMessage",{params:{"index":id,"user":JSON.parse($window.localStorage.getItem("user"))}} ).then((data)=>
    {
      if(data!=null)
      {
        alert('Deleted submitted');
         $location.path(['/Message']);;
      }
      
   }).catch((err)=>{console.log("Error!!")});
}

}); 

app.controller('replyController', function ($scope, $location, $routeParams,$httpParamSerializerJQLike, $http, $window, $rootScope) {

    $scope.isLoggedIn = true;
    var sender = $routeParams.sender;
    
    $scope.submit=function(reply)
    {
        console.log($rootScope.message);
     var mObj2 = {
         "message": reply,
         "Receiver":sender,
         "markAsImp": false,
         "Sender":JSON.parse($window.localStorage.getItem("user"))
     }
     var config={
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }
     $http.post("http://localhost:3000/api/messages/Reply",$httpParamSerializerJQLike(mObj2),config).then((data)=>
          {
              if(data!=null)
              {
                  alert('Successfully submitted');
                 $location.path(['/Message']);
              }
             
         }).catch(()=>{console.log("Error!!")});
 
 
 
    }

   
}); 
