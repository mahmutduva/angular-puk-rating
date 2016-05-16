angular
    .module('app',["puk.starRating"])
    .controller('appController',appController);


function appController() {
    var vm = this;

    vm.star = 5;
    vm.selectedStar = 2;
}