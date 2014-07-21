var app = angular.module('app', ['infinityScroll']);
app.controller("baseController", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    var offset = offset2 = 0;
    $scope.scrollItems = [];
    $scope.scrollItems2 = [];
    //Запрос новых данных
    $scope.scroll = function () {
        $http({ 'url': 'http://totpp.demosite.pro/slu/test.html?limit=60&offset=' + offset, 'method': 'get', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} }).success(function (data) {
            var ln = data.length;
            if (!ln) {
                $scope.accept = false;
            } else {
                for (var i = 0; i < ln; i++) {
                    $scope.scrollItems.push(data[i]);
                }
                offset += 60;
                $scope.accept = true;
            }
        });
    }

    $scope.after = function () {
      console.log('after');
    };

    $scope.before = function () {
        console.log("before");
    }

    $scope.scroll2 = function () {
        $http({ 'url': 'http://totpp.demosite.pro/slu/test.html?limit=60&offset=' + offset2, 'method': 'get', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} }).success(function (data) {
            var ln = data.length;
            if (!ln) {
                $scope.accept2 = false;
            } else {
                for (var i = 0; i < ln; i++) {
                    $scope.scrollItems2.push(data[i]);
                }
                offset2 += 60;
                $scope.accept2 = true;
            }
        });
    }
} ]);
