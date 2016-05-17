###[Live Demo](http://plnkr.co/edit/IVqMk5OjYn259m4eRUdq?p=preview)

# puk-rating
rating system for everything

### NPM
```
$ npm install puk-rating

```

### Bower
```
$ bower install puk-rating

```

### Module
```javascript

angular.module('yourApp', ['pukRating']);

```

### Example

```html

    <puk-rating puk-count="5" puk-model="3" readonly="true" puk-icon-color="#5FBA7D" puk-icon-size="80px" puk-icon-base="fa" puk-empty-icon="fa-heart-o" puk-full-icon="fa-heart"></puk-rating>

```

```html

    <puk-rating puk-count="5" puk-model="2" puk-image-width="66px" puk-image-height="66px" puk-empty-image="../images/sad.svg" puk-full-image="../images/smile.svg"></puk-rating>

```


## Directive attributes

**puk-count**

>

**puk-model**

>

**puk-icon-color**

>

**puk-icon-size**

>

**puk-icon-base**

>

**puk-empty-icon**

>

**puk-full-icon**

>

**puk-image-width / puk-image-height**

>

**puk-empty-image**

>

**puk-full-image**




## Rating events

getRatingValue event

```javascript
    $scope.$on("getRatingValue", function(event,data) {
        // action
    });
```
getRatingHoverValue event

```javascript
    $scope.$on("getRatingHoverValue", function(event,data) {
        console.log(data)
    });
```

## License

Licensed under the MIT license