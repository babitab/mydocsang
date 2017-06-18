var myDocsUser = angular.module('MyDocsUser');

myDocsUser.service('SessionServices', function(){
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


myDocsUser.factory("UserData",['$http','apiRoot','SessionServices',  function(http, apiRoot, session){
    return{
        data: function(){
            return http.get(apiRoot+'/userData.php');
        },
        files: function () {
            return http.get(apiRoot+'/userFiles.php');
        },
        deleteFile: function(file){
            return http.post(apiRoot+'/deleteFile.php', file);
        },
        logout: function(){
            http.get(apiRoot+'/logout.php');
            session.destroy('isLoggedIn');
            session.destroy('type');
            return 0;
        }

    }
}]);

myDocsUser.factory("UpdateData",['$http','apiRoot',  function(http, apiRoot){
    return{
        profile: function(profileData){
            return http.post(apiRoot+'/profile.php', profileData);
        },
        password: function (passData) {
            return http.post(apiRoot+'/changepass.php', passData);
        }
    }
}]);


myDocsUser.factory("Constants", ['$http','apiRoot', function(http, apiRoot){
    return{
        docTypes : function(){
            return http.get(apiRoot+'/docTypes.php');
        },
        supportedFiles: function(){
            return http.get(apiRoot+'/supportedFiles.php');
        }
    }
}]);
