angular
    .module('app',["pukRating"])
    .controller('appController',appController);


function appController($scope) {
    var vm = this;

    vm.puk = 5;
    vm.selectedPuk = 2;


    $scope.$on("getRatingValue", function(event,data) {
        console.log(data)
    });

    $scope.$on("getRatingHoverValue", function(event,data) {
        console.log(data)
    });

}