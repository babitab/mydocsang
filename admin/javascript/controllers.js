var myDocsAdmin = angular.module('MyDocsAdmin');



myDocsAdmin.controller('MenuController', ['$scope','AdminData', function(scope, admin){
    scope.user = {};
    var $promise = admin.data();
    $promise.then(function(response){
        var data = response.data;
        if(data.status){
            scope.user = data.userData;
        }
    });

    scope.logout = function(){
        admin.logout();
        window.location = './../';
    };
}]);

myDocsAdmin.controller("HomeController", ['$scope','Users', function (scope, users) {
    scope.welcome = "Hello Admin";

    scope.selectedUser = {};

    scope.selection = 'users';

    scope.users = [];

    var $promise = users.allUsers();
    $promise.then(function(response){
        scope.users = response.data.users;
    });


    scope.userDocuments = function(user){
        scope.selection = 'selectedUser';
        var $promise = users.files(user.id);
        $promise.then(function(response){
            scope.selectedUser.data = user;
            scope.selectedUser.files = response.data.files;
        });
    };

    scope.deleteFile = function(userId, file){
        var deleteFileConfirm = confirm("Are you sure you want to delete this file");
        if(deleteFileConfirm){
            var $promise = users.deleteFile(userId, file.tmpName);
            $promise.then(function(response){
                var data = response.data;
                if(data.fileDeleted){
                    scope.selectedUser.files.splice(scope.selectedUser.files.indexOf(file), 1);
                    alert("File successfully deleted");

                }else{
                    alert("Problem while deleting file");
                }
            });
        }
    };

    scope.deleteUser = function(user){
        var deleteConfirm = confirm("Are you sure you want to delete this user");
        if(deleteConfirm){
            var $promise = users.deleteUser(user.id);
            $promise.then(function (response) {
                var data = response.data;
                if(data.userDeleted){
                    scope.users.splice(scope.users.indexOf(user), 1);
                    alert("User successfully deleted");
                }
            });
        }
    };

}]);