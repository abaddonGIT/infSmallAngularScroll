infSmallAngularScroll
=====================

Маленький модуль для реализации бесконечной прокрутки на angularjs.
<h3>Подключение:</h3>
<pre>
var app = angular.module('app', ['infinityScroll']);
</pre>
<h3>В шаблоне:</h3>
<pre>
&lt;div ng-scroll-place scroll-height-watch="500" scroll-processing="scroll()" scroll-disabled="accept" scroll-after-deadline="after()" scroll-before-deadline="before()"&gt;
        &lt;div ng-repeat="item in scrollItems2"&gt;
            {{item.pagetitle}}
        &lt;/div&gt;
&lt;/div&gt;
</pre>
<h3>Параметры:</h3>
<ul>
    <li><b>scrollProcessing</b> - ф-я выполняется, когда прокрутка достигает конца</li>
    <li><b>scrollSource</b> - если <b>true</b>, то прокрутка считается относительно элемента, на котором была вызвана директива</li>
    <li><b>scrollDisabled</b> - флаг, через который ставиться пауза на отслеживание прокрутки</li>
    <li><b>scrollAfterDeadline</b> - ф-я выполняется после прохождения величины указанной в параметре <b>scrollHeightWatch</b></li>
    <li><b>scrollBeforeDeadline</b> - ф-я выполняется после обратного прохождения величины указанной в параметре <b>scrollHeightWatch</b></li>
    <li><b>scrollHeightWatch</b> - указывается высота после прохождения, которой будут выполняться ф-и указанные в параметрах <b>scrollAfterDeadline</b> и <b>scrollBeforeDeadline</b></li>
</ul>
<h3>В контроллере:</h3>
<pre>
app.controller("baseController", ['$scope', '$http', function ($scope, $http) {
    var offset = 0;
    $scope.scrollItems = [];
    $scope.scroll = function () {
        $http({ 'url': 'http://test.ru/test.php?limit=60&offset=' + offset, 'method': 'get', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} }).success(function (data) {
            var ln = data.length;
            if (!ln) {
                $scope.accept = false;
            } else {
                for (var i = 0; i &lt; ln; i++) {
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
} ]);
</pre>