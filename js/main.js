var app = angular.module('app', ['infinityScroll']);
app.controller("baseController", ['$scope', '$http', '$rootScope', '$infinityScroll', function ($scope, $http, $rootScope, $infinityScroll) {
    var offset = 0;
    $scope.scrollItems = [];
    var scroll = $infinityScroll.start({
        external: false
    });
    scroll.result = function (go) {
        $http({ 'url': 'http://totpp.demosite.pro/slu/test.html?limit=60&offset=' + offset, 'method': 'get', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} }).success(function (data) {
            var ln = data.length;
            if (!ln) {
                go(0);
            } else {
                for (var i = 0; i < ln; i++) {
                    $scope.scrollItems.push(data[i]);
                }
                offset += 60;
                go(1);
            }
        });
    };
    var scroll2 = $infinityScroll.start({
        'name': 'two'
    });
    console.log(scroll2);

    //Запрос новых данных
//    $scope.scroll = function () {
//    $http({ 'url': 'http://totpp.demosite.pro/slu/test.html?limit=60&offset=' + offset, 'method': 'get', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} }).success(function (data) {
//        var ln = data.length;
//        if (!ln) {
//            $scope.accept = false;
//        } else {
//            for (var i = 0; i < ln; i++) {
//                $scope.scrollItems.push(data[i]);
//            }
//            offset += 60;
//            $scope.accept = true;
//        }
//    });
//    }
//
//    $scope.scroll2 = function () {
//        $http({ 'url': 'http://totpp.demosite.pro/slu/test.html?limit=60&offset=' + offset2, 'method': 'get', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} }).success(function (data) {
//            var ln = data.length;
//            if (!ln) {
//                $scope.accept2 = false;
//            } else {
//                for (var i = 0; i < ln; i++) {
//                    $scope.scrollItems2.push(data[i]);
//                }
//                offset2 += 60;
//                $scope.accept2 = true;
//            }
//        });
//    }
} ]);
