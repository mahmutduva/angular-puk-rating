/**
 * @name ng.directive: starRating
 * @description
 *
 */
angular
    .module('puk.starRating', [])
    .directive('starRating', function () {
        return {
            restrict: 'EA',
            replace: true,
            link: starLink,
            template: starTemplate,
            scope: {
                starCount: '=',
                starModel: '=',
                starIconBase: '@',
                starEmptyIcon: '@',
                starFullIcon: '@',
                starIconColor: '@',
                starIconSize: '@',
                starEmptyImage: '@',
                starFullImage: '@',
                starImageHeight: '@',
                starImageWidth: '@',
                readonly: '@'

            }
        }
    });


/**
 * @name starTemplate
 * @param scope
 * @param element
 * @param attrs
 * @returns {string}
 */
function starTemplate(scope, element, attrs) {
    return '<ul class="puk-star">' +
        '<li ng-mouseenter="paintStars($index, true)" ng-mouseleave="unPaintStars($index, false)" ng-repeat="star in starList track by $index">' +
        '<i ng-class="getClass($index)"  ng-style="getStyle($index)" ng-click="setStarValue($index, $event)"></i>' +
        '</li>' +
        '</ul>'
}


/**
 * @name starLink
 * @param scope
 * @param element
 * @param attrs
 */
function starLink(scope, element, attrs) {


    //Functions
    scope.getClass = getClass;
    scope.getStyle = getStyle;
    scope.paintStars = paintStars;
    scope.unPaintStars = unPaintStars;
    scope.setStarValue = setStarValue;


    setScopeValues(scope, element, attrs);


    /**
     * @name getClass
     * @param index
     * @returns {string}
     */
    function getClass(index) {
        if (scope.starEmptyImage && scope.starFullImage) {
            return;
        }
        else {
            return index < scope.starModel ? scope.starFullIcon + ' ' + scope.starIconBase : scope.starEmptyIcon + ' ' + scope.starIconBase;
        }
    }


    /**
     * @name getStyle
     * @param index
     * @returns {*}
     */
    function getStyle(index) {
        if (scope.starEmptyImage && scope.starFullImage) {
            var image_url = index < scope.starModel ? scope.starFullImage : scope.starEmptyImage;
            return {
                "background": "url(" + image_url + ")",
                "background-size": scope.starImageWidth + ' ' + scope.starImageHeight,
                "display": "block",
                "width": scope.starImageWidth,
                "height": scope.starImageHeight
            }
        }
        else {
            return {
                "color": scope.starIconColor,
                "font-size": scope.starIconSize
            }
        }
    }


    /**
     * @name paintStars
     * @param index
     * @param hover
     */
    function paintStars(index, hover) {
        if (scope.readonly) {
            return;
        }
        var items = element.find('li').find('i');


        for (var i = 0; i < items.length; i++) {
            var star = angular.element(items[i]);

            if (index >= i) {
                if (scope.starEmptyImage && scope.starFullImage) {
                    star.css({"background": "url(" + scope.starFullImage + ")"})
                }
                else {
                    star.removeClass(scope.starEmptyIcon);
                    star.addClass(scope.starFullIcon);
                }

            }
            else {
                if (scope.starEmptyImage && scope.starFullImage) {
                    star.css({"background": "url(" + scope.starEmptyImage + ")"})
                }
                else {
                    star.removeClass(scope.starFullIcon);
                    star.addClass(scope.starEmptyIcon);
                }

            }
        }

    }


    /**
     * @name unPaintStars
     * @param index
     * @param hover
     */
    function unPaintStars(index, hover) {

        paintStars(scope.starModel - 1, hover);

    }


    /**
     * @name setStarValue
     * @param index
     * @param event
     */
    function setStarValue(index, event) {

        if (scope.readonly) {
            return;
        }

        scope.starModel = index + 1;
    }

}


/**
 * @name setScopeValues
 * @param scope
 * @param element
 * @param attrs
 */
function setScopeValues(scope, element, attrs) {

    scope.starList = [];

    scope.starCount = parseInt(scope.starCount) || 1;
    scope.starModel = parseInt(scope.starModel) || 0;


    if (scope.starEmptyImage && scope.starFullImage) {
        scope.starImageWidth = scope.starImageWidth || '16px';
        scope.starImageHeight = scope.starImageHeight || '16px';
    }
    else {
        scope.starIconBase = scope.starIconBase || 'fa';
        scope.starEmptyIcon = scope.starEmptyIcon || 'fa-star-o';
        scope.starFullIcon = scope.starFullIcon || 'fa-star';
        scope.starIconColor = scope.starIconColor || '#000000';
        scope.starIconSize = scope.starIconSize || '16px';
    }


    for (var i = 0; i < scope.starCount; i++) {
        scope.starList.push({
            value: i
        });
    }


}

