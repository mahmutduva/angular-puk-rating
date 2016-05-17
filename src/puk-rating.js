/**
 * @name ng.directive: starRating
 * @description
 *
 */
angular
    .module('pukRating', [])
    .directive('pukRating', function () {
        return {
            restrict: 'EA',
            replace: true,
            link: pukLink,
            template: pukTemplate,
            scope: {
                pukCount: '=',
                pukModel: '=',
                pukIconBase: '@',
                pukEmptyIcon: '@',
                pukFullIcon: '@',
                pukIconColor: '@',
                pukIconSize: '@',
                pukEmptyImage: '@',
                pukFullImage: '@',
                pukImageHeight: '@',
                pukImageWidth: '@',
                readonly: '@'

            }
        }
    });


/**
 * @name pukTemplate
 * @param scope
 * @param element
 * @param attrs
 * @returns {string}
 */
function pukTemplate(scope, element, attrs) {
    return '<ul class="puk-rating">' +
        '<li ng-mouseenter="paintPuks($index, true)" ng-mouseleave="unPaintPuks($index, false)" ng-repeat="puk in pukList track by $index">' +
        '<i ng-class="getClass($index)"  ng-style="getStyle($index)" ng-click="setPukValue($index, $event)"></i>' +
        '</li>' +
        '</ul>'
}


/**
 * @name pukLink
 * @param scope
 * @param element
 * @param attrs
 */
function pukLink(scope, element, attrs) {


    //Functions
    scope.getClass = getClass;
    scope.getStyle = getStyle;
    scope.paintPuks = paintPuks;
    scope.unPaintPuks = unPaintPuks;
    scope.setPukValue = setPukValue;


    setScopeValues(scope, element, attrs);


    /**
     * @name getClass
     * @param index
     * @returns {string}
     */
    function getClass(index) {
        if (scope.pukEmptyImage && scope.pukFullImage) {
            return;
        }
        else {
            return index < scope.pukModel ? scope.pukFullIcon + ' ' + scope.pukIconBase : scope.pukEmptyIcon + ' ' + scope.pukIconBase;
        }
    }


    /**
     * @name getStyle
     * @param index
     * @returns {*}
     */
    function getStyle(index) {
        if (scope.pukEmptyImage && scope.pukFullImage) {
            var image_url = index < scope.pukModel ? scope.pukFullImage : scope.pukEmptyImage;
            return {
                "background": "url(" + image_url + ")",
                "background-size": scope.pukImageWidth + ' ' + scope.pukImageHeight,
                "display": "block",
                "width": scope.pukImageWidth,
                "height": scope.pukImageHeight
            }
        }
        else {
            return {
                "color": scope.pukIconColor,
                "font-size": scope.pukIconSize
            }
        }
    }


    /**
     * @name paintPuks
     * @param index
     * @param hover
     */
    function paintPuks(index, hover) {
        if (scope.readonly) {
            return;
        }
        var items = element.find('li').find('i');

        scope.$emit('getRatingHoverValue', index + 1);

        for (var i = 0; i < items.length; i++) {
            var puk = angular.element(items[i]);

            if (index >= i) {
                if (scope.pukEmptyImage && scope.pukFullImage) {
                    puk.css({"background-image": "url(" + scope.pukFullImage + ")"})
                }
                else {
                    puk.removeClass(scope.pukEmptyIcon);
                    puk.addClass(scope.pukFullIcon);
                }

            }
            else {
                if (scope.pukEmptyImage && scope.pukFullImage) {
                    puk.css({"background-image": "url(" + scope.pukEmptyImage + ")"})
                }
                else {
                    puk.removeClass(scope.pukFullIcon);
                    puk.addClass(scope.pukEmptyIcon);
                }

            }
        }

    }


    /**
     * @name unPaintPuks
     * @param index
     * @param hover
     */
    function unPaintPuks(index, hover) {

        paintPuks(scope.pukModel - 1, hover);

    }


    /**
     * @name setPukValue
     * @param index
     * @param event
     */
    function setPukValue(index, event) {

        if (scope.readonly) {
            return;
        }

        scope.pukModel = index + 1;

        scope.$emit('getRatingValue', scope.pukModel);
    }

}


/**
 * @name setScopeValues
 * @param scope
 * @param element
 * @param attrs
 */
function setScopeValues(scope, element, attrs) {

    scope.pukList = [];


    scope.pukCount = parseInt(scope.pukCount) || 1;
    scope.pukModel = parseInt(scope.pukModel) || 0;


    if (scope.pukEmptyImage && scope.pukFullImage) {
        scope.pukImageWidth = scope.pukImageWidth || '16px';
        scope.pukImageHeight = scope.pukImageHeight || '16px';
    }
    else {
        scope.pukIconBase = scope.pukIconBase || 'fa';
        scope.pukEmptyIcon = scope.pukEmptyIcon || 'fa-star-o';
        scope.pukFullIcon = scope.pukFullIcon || 'fa-star';
        scope.pukIconColor = scope.pukIconColor || '#000000';
        scope.pukIconSize = scope.pukIconSize || '16px';
    }


    for (var i = 0; i < scope.pukCount; i++) {
        scope.pukList.push({
            value: i
        });
    }


}

