/**
 * Created by netBeans.
 * User: abaddon
 * Date: 18.07.14
 * Time: 13:10
 * Description: infinity scroll on angularjs
 */
(function (an, w, d) {
    "use strict";
    var infinityScroll = an.module("infinityScroll", [])
        .value("$scrollInstance", {})
        .directive("ngScrollPlace", ['$rootScope', '$timeout', '$scrollInstance', '$interval', function ($rootScope, $timeout, $scrollInstance, $interval) {
            return {
                scope: {
                    scrollDisabled: "=?"
                },
                link: function (scope, elem, attr) {
                    var name = attr.ngScrollPlace || 'first';
                    var timer = $interval(function () {
                        var instance = $scrollInstance[name];
                        if (instance) {
                            instance.defer.resolve({'scope': scope, 'elem': elem});
                            $interval.cancel(timer);
                        }
                    }, 100);
                }
            };
        } ]).factory('$infinityScroll', ['$rootScope', '$scrollInstance', '$q', '$timeout', function ($rootScope, $scrollInstance, $q, $timeout) {
            var InfScroll = function (options) {
                var contener, config, elemSource, dH, scrollTimer, scrollTop, wH;
                if (!(this instanceof InfScroll)) {
                    return new InfScroll(options);
                }
                an.extend(this, {
                    timestamp: Date.now(),
                    config: {},
                    defer: $q.defer(),
                    accept: true,
                    result: function () {
                    }
                });
                config = an.extend(this.config, {
                    name: 'first',
                    heightWatch: 500,
                    external: true
                }, options);

                var result = function () {
                    this.accept = false;
                    var resultDefer = $q.defer();
                    this.result(function (flag) {resultDefer.resolve(flag);});
                    resultDefer.promise.then(function (flag) {
                        flag ? this.accept = true : this.accept = false;
                    }.bind(this));
                };
                var handler = function () {
                    scrollTop = contener[0].pageYOffset || elemSource.scrollTop;
                    wH = Math.max(elemSource.scrollHeight, dH);
                    if (scrollTop + 200 >= wH - dH && this.accept) {
                        result.call(this);
                    }
                };
                var startScroll = function (directive) {
                    if (config.external) {//Выбираем контенер со скролом
                        contener = an.element(w);
                        elemSource = d.documentElement;
                    } else {
                        contener = directive.elem;
                        elemSource = directive.elem[0];
                    }
                    dH = elemSource.clientHeight;
                    contener.off("scroll").on("scroll", function () {
                        $timeout.cancel(scrollTimer);
                        scrollTimer = $timeout(function () {//Задержка скрола
                            handler.call(this);
                        }.bind(this), 100);
                    }.bind(this));
                    result.call(this);
                };
                $scrollInstance[this.config.name] = this;

                this.defer.promise.then(function (directive) {
                    startScroll.call(this, directive);
                }.bind(this));
            };
            InfScroll.prototype = {
                bind: function (event, handler) {
                    var name = event + ':' + this.timestamp;
                    $rootScope.$on(name, handler.bind(this));
                },
                trigger: function (event) {
                    arguments[0] = event + ':' + this.timestamp;
                    $rootScope.$broadcast.apply($rootScope, arguments);
                }
            };
            return {
                start: function (options) {
                    return InfScroll(options);
                }
            }
        }]);
})(angular, window, document);