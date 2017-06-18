var myDocsAdmin = angular.module('MyDocsAdmin', ['ui.router']);

myDocsAdmin.value("apiRoot", "./../api");

myDocsAdmin.config(["$stateProvider", "$urlRouterProvider", function(stateProvider, urlProvider){

    urlProvider.otherwise('/home');

    stateProvider
        .state('home', {
            url:"/home",
            templateUrl: './views/home.html'
        })

}]);


myDocsAdmin.run(['$rootScope','SessionServices', function(rootScope, session){
    rootScope.$on('$stateChangeStart', function(){
        if(!session.hasKey("isLoggedIn") || session.get('type') != 'admin' ){
            window.location = './../';
        }
    });
}]);

myDocsAdmin.directive("myMenu", function(){
    return{
        restrict: 'E',
        templateUrl:'./templates/menu.html'
    }
});