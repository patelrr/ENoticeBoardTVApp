'use strict';
angular.module('EnoticeBoardWebApp.welcome', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html'
        , controller: 'WelcomeCtrl'
    });
}]).controller('WelcomeCtrl', ['$scope', '$timeout', 'CommonProp', '$firebaseArray', function ($scope, $timeout, CommonProp, $firebaseArray) {
    //var timeint = 100;
    setInterval(function () {
        const ref = firebase.database().ref().child('posts').child('CSE').child('Deptposts').orderByChild("approved").equalTo("true");
        $scope.articles = $firebaseArray(ref);
        $scope.articles.$loaded().then(function () {
            var pictime = 20000 / $scope.articles.length;
            //console.log($scope.articles.length);
            let promise = $timeout();
            angular.forEach($scope.articles, function (art) {
                promise = promise.then(function () {
                    $scope.artt = art;
                    return $timeout(pictime);
                });
            })
        });
        //dispfun();
        /*
        for (var i = 0; i < 10; i++) {
            console.log(i);
        }
        */
        //timeint = $scope.articles.length * 5000;
    }, 20000);
    const ref1 = firebase.database().ref().child('posts').child('CSE').child('Deptposts').orderByChild("approved").equalTo("false");
    $scope.test = $firebaseArray(ref1);
}])