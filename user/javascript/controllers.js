var myDocsUser = angular.module('MyDocsUser');

myDocsUser.controller('MenuController', ['$scope','UserData','$rootScope', function(scope, userData, rootScope){
    rootScope.userData = {};
    var $promise = userData.data();
    $promise.then(function(response){
        var data = response.data;
        if(data.status){
            rootScope.userData = data.userData;
        }
    });

    scope.logout = function(){
        console.log("want's to logout");
        userData.logout();
        window.location = './../';
    };
}]);

myDocsUser.controller('HomeController',['$scope', 'UserData','Constants','$filter', function(scope, userData, constants, $filter){
    scope.userFiles = {};

    var $promise1 = constants.docTypes();
    $promise1.then(function(response){
        scope.docTypes = response.data;
    });

    scope.docFilter = [];

    scope.addFilter = function (i) {
        if(scope.docFilter.indexOf(scope.docTypes[i]) != -1){
            scope.docFilter.splice(scope.docFilter.indexOf(scope.docTypes[i]), 1);
        }else{
            scope.docFilter.push(scope.docTypes[i]);
        }
    };

    var $promise = userData.files();
    $promise.then(function(response){
       var data = response.data;
        if(data.status){
            scope.userFiles = data.files;
        }
    });

    scope.deleteFile = function (file) {
        var confirmDeletion = confirm("Are you sure you want to delete this tile.");
        if(confirmDeletion){
            var tmpName = {'fileName': file.tmpName};
            $promise = userData.deleteFile(tmpName);
            $promise.then(function(response){ deleteFileCB(file, response) });
        }
    };

    function deleteFileCB(file, response){
        var data = response.data;
        if(data.fileDeleted){
            scope.userFiles.splice(scope.userFiles.indexOf(file), 1);
        }else{
            console.log(data.errors);
        }
    }

}]);


myDocsUser.controller('ChangePasswordController', ['$scope','UpdateData','$location', function(scope, update, location){
    scope.changeData = {'currpassword':"", 'password':"", 'repassword':""};

    scope.changePassword = function(){
        var $promise = update.password(scope.changeData);
        $promise.then(function(response){changePasswordResponse(response);})
    };

    function changePasswordResponse(resp){
        var data = resp.data;
        if(data.passChangeStatus){
            alert("Password Successfully changed.");
            location.path('/home');
        }else{
            console.log(data.errors);
        }
    }

}]);

myDocsUser.controller('UpdateProfileController', ['$scope','UpdateData','$location','$rootScope', function(scope, update, location, rootScope){
    scope.newProfileData = {'firstName':"", 'lastName':""};

    scope.updateProfile = function(){
        var $promise = update.profile(scope.newProfileData);
        $promise.then(function(response){updateProfileCB(response);});
    };

    function updateProfileCB(response){
        var data = response.data;
        if(data.profileUpdated){
            alert("Profile Successfully updated");
            rootScope.userData.firstName = scope.newProfileData.firstName;
            rootScope.userData.lastName = scope.newProfileData.lastName;
            location.path('/home');
        }else{
            console.log(data.errors);
        }
    }
}]);


myDocsUser.controller('UploadFileController', ['$scope','Constants', function(scope, constants){

    var $promise = constants.docTypes();
    $promise.then(function(response){
        scope.docTypes =  response.data;
    });

    var $promise1 = constants.supportedFiles();
    $promise1.then(function(response){
       scope.supportedFiles = response.data.join(', ');
    });

}]);

