(function() {
"use strict";








var MECHANICS = [
    function () { },
    gen12_1.calculateRBYGSC,
    gen12_1.calculateRBYGSC,
    gen3_1.calculateADV,
    gen4_1.calculateDPP,
    gen56_1.calculateBWXY,
    gen56_1.calculateBWXY,
    gen789_1.calculateSMSSSV,
    gen789_1.calculateSMSSSV,
    gen789_1.calculateSMSSSV,
];
function calculate(gen, attacker, defender, move, field) {
    return MECHANICS[gen.num](gen, attacker.clone(), defender.clone(), move.clone(), field ? field.clone() : new field_1.Field());
}

//# sourceMappingURL=calc.js.map
})();