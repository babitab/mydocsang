var myDocsUser = angular.module('MyDocsUser', ['ui.router']);

// value service for our app
myDocsUser.value("apiRoot", "./../api");


// configuration for routing
myDocsUser.config(['$stateProvider', '$urlRouterProvider', function(stateProvider, routeProvider){

    routeProvider.otherwise('/home');

    stateProvider
        .state('home',{
            url: '/home',
            views: {
                'main-view':{templateUrl: './views/home.html'}
            }
        })
        .state('fileUpload', {
            url: '/fileUpload',
            views:{
                'main-view':{templateUrl: './views/fileUpload.html'}
            }
        })
        .state('updateProfile', {
            url: '/updateProfile',
            views:{
                'main-view':{templateUrl: './views/updateProfile.html'}
            }
        })
        .state('changePassword', {
            url: '/changePassword',
            views:{
                'main-view':{templateUrl: './views/changePassword.html'}
            }
        })
}]);

// app's rul block
myDocsUser.run(['$rootScope','SessionServices', function(rootScope, session){
    rootScope.$on('$stateChangeStart',function(){
        if(!session.hasKey('isLoggedIn') || session.get('type') != 'user' ){
            window.location = './../';
        }
    });

}]);


// directives
myDocsUser.directive('myMenu', function(){
    return{
        restrict: 'E',
        templateUrl: './templates/menu.html'
    }
});


// filter for our user application
myDocsUser.filter('DocFilter', function(){
    return function(input, docFilter){
        var filteredArray = [];
        if(docFilter.length == 0)
            return input;
        else{
            for(var i=0; i < input.length; i++){
                if(docFilter.indexOf(input[i].type) != -1){
                    filteredArray.push(input[i]);
                }
            }

        }
        return filteredArray;
    }
});