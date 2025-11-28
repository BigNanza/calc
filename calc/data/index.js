(function() {
"use strict";









    function class_1() {
    }
    class_1.prototype.get = function (gen) {
        return new Generation(gen);
    };
    return class_1;
}()))();
var Generation = (function () {
    function Generation(num) {
        this.num = num;
        this.abilities = new abilities_1.Abilities(num);
        this.items = new items_1.Items(num);
        this.moves = new moves_1.Moves(num);
        this.species = new species_1.Species(num);
        this.types = new types_1.Types(num);
        this.natures = new natures_1.Natures();
    }
    return Generation;
}());
//# sourceMappingURL=index.js.map
})();