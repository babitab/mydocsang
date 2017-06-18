var myDocsAdmin = angular.module('MyDocsAdmin');

myDocsAdmin.service('SessionServices', function(){
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

myDocsAdmin.factory("AdminData",['$http','apiRoot','SessionServices',  function(http, apiRoot, session) {
    return {
        data: function () {
            return http.get(apiRoot + '/userData.php');
        },
        logout: function(){
            http.get(apiRoot+'/logout.php');
            session.destroy('isLoggedIn');
            session.destroy('type');
            return 0;
        }
    }
}]);

myDocsAdmin.factory("Users", ['$http', 'apiRoot', function (http, apiRoot) {
    return{
        allUsers: function(){
          return http.get(apiRoot+'/allUsers.php');
        },
        files: function(userId){
            return http.post(apiRoot+'/userFiles.php',{'userId': userId} );
        },
        deleteUser: function(userId){
            return http.post(apiRoot+'/deleteUser.php', {'userId':userId});
        },
        deleteFile: function(userId, fileName){
            return http.post(apiRoot+'/deleteFile.php', {'userId': userId, 'fileName':fileName});
        }
    }
}]);
