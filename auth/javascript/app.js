var myDocs = angular.module('MyDocs', ['ui.router']);

myDocs.value("apiRoot", "./api");

myDocs.config(['$stateProvider', '$urlRouterProvider', function(stateProvider, routeProvider){
    routeProvider.otherwise('/login');

    stateProvider
        .state('login',{
            url: '/login',
            views: {
                'main-view':{templateUrl: './auth/views/login.html'}
            }
        })
        .state('signUp', {
            url: '/signUp',
            views:{
                'main-view':{templateUrl: './auth/views/signUp.html'}
            }
        })
}]);

myDocs.run(['$rootScope', '$location','SessionServices', function(rootScope, location, session){
    var logoutRequired = ['login'];
    rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        if(logoutRequired.indexOf(toState.name) != -1 && session.hasKey('isLoggedIn')){
            var type = session.get('type');
            switch (type){
                case 'user':
                    window.location = './user/';
                    break;
                case 'admin':
                    window.location = './admin/';
                    break;
                default :
                    break;
            }
        }
    });

}]);



myDocs.directive('myMenu', function(){
   return{
       restrict: 'E',
       templateUrl: './auth/templates/menu.html'
   }
});
