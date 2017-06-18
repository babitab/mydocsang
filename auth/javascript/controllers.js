var myDocs = angular.module('MyDocs');

myDocs.controller('LoginController', ['$scope','AuthServices','SessionServices', function(scope,  loginService, session){
    scope.user = {"email":"", "password": ""};
    scope.login = function () {
       var $promise = loginService.login(scope.user);
       $promise.then(function(response){loginCB(response)});
    };

    function loginCB(resp){
       var data = resp.data;
        if(data.loginStatus){
            session.set('isLoggedIn', true);
            session.set('type', data.type);
            switch (data.type){
                case 'user':
                    window.location = './user/';
                    break;
                case 'admin':
                    window.location = './admin/';
                    break;
                default :
                    break;
            }
        }else{
            alert(data.message);
        }
        scope.user.password = "";
    }
}]);


myDocs.controller('SignUpController', ['$scope','AuthServices','$location', function(scope, signUpService, location){
    scope.newUser = {"firstName":"", "lastName":"", "email":"", "password":"", "repassword":""};
    scope.signUp = function(){
        var $promise = signUpService.signUp(scope.newUser);
        $promise.then(function(response){signUpCB(response);})
    };

    function signUpCB(resp){
        var data = resp.data;
        if(data.registered){
            alert("Registration successfully done. You can now login in.");
            location.path('/login');
        }else{
            scope.newUser.password = "";
            scope.newUser.repassword = "";
            console.log(data.errors);
        }
    }

}]);