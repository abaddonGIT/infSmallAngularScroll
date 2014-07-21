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
        .directive("ngScrollPlace", ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                scope: {
                    ngScrollPlace: "&",
                    scrollSource: "@",
                    scrollDisabled: "=?",
                    scrollAfterDeadline: "&",
                    scrollBeforeDeadline: "&",
                    scrollHeightWatch: "=?"
                },
                link: function (scope, elem, attr) {
                    var scrollEl, dH, allH, scrollTop, doc, big = false, small = true, timer;

                    var scrollHandler = function () {
                        scrollTop = w.pageYOffset || doc.scrollTop;
                        allH = Math.max(doc.scrollHeight, dH);
                        var contenerPath = dH + scrollTop; //прошедший путь
                        if (scrollTop + 200 >= allH - dH && scope.scrollDisabled) {
                            scope.scrollDisabled = false;
                            scope.ngScrollPlace();
                        }
                        if (scrollTop > scope.scrollHeightWatch && !big) {
                            scope.scrollAfterDeadline();
                            big = true;
                            small = false;
                        }
                        if (scrollTop < scope.scrollHeightWatch && !small) {
                            scope.scrollBeforeDeadline();
                            big = false;
                            small = true;
                        }
                    };
                    var startScroll = function () {
                        scrollEl = !scope.scrollSource ? an.element(w) : elem;
                        doc = !scope.scrollSource ? d.documentElement : elem[0];
                        dH = doc.clientHeight;

                        scrollEl.off("scroll").on("scroll", function () {
                            $timeout.cancel(timer);//ставим задержку для уменьшения расчетов
                            timer = $timeout(scrollHandler, 100);
                        });
                        scope.ngScrollPlace();
                    };
                    $timeout(function () {
                        scope.scrollDisabled = true;
                        startScroll();
                    }, 0);
                }
            };
        } ]).filter("html", ['$sce', function ($sce) {
            return function (input) {
                return $sce.trustAsHtml(input);
            };
        } ]);
})(angular, window, document);