var myDocs = angular.module('MyDocs');

myDocs.service('SessionServices', function(){
    this.set = function(key, value){
        return sessionStorage.setItem(key, value);
    };
    this.get = function(key){
        return sessionStorage.getItem(key);
    };
    this.destroy = function(key){
        return sessionStorage.removeItem(key);
    };
    this.hasKey = function(key){
        return sessionStorage.getItem(key) != undefined;
    }

});


myDocs.factory('AuthServices', ['$http','apiRoot',  function(http, apiRoot){
    return{
        login: function(user){
            return http.post(apiRoot+'/login.php', user);
        },
        signUp: function(newUser){
            return http.post(apiRoot+'/signUp.php', newUser );
        },
        logout: function(){
            return http.get(apiRoot+'/logout.php')
        }
    }
}]);
