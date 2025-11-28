"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });

const data_1 = require("./data");
const A = __importStar(require("./adaptable"));
const Acalculate = exports.calculate;
function calculate(gen, attacker, defender, move, field) {
    return (Acalculate || A.calculate)(typeof gen === 'number' ? data_1.Generations.get(gen) : gen, attacker, defender, move, field);
}
exports.calculate = calculate;
class Move extends A.Move {
    constructor(gen, name, options = {}) {
        super(typeof gen === 'number' ? data_1.Generations.get(gen) : gen, name, options);
    }
}
exports.Move = Move;
class Pokemon extends A.Pokemon {
    constructor(gen, name, options = {}) {
        super(typeof gen === 'number' ? data_1.Generations.get(gen) : gen, name, options);
    }
    static getForme(gen, speciesName, item, moveName) {
        return A.Pokemon.getForme(typeof gen === 'number' ? data_1.Generations.get(gen) : gen, speciesName, item, moveName);
    }
}
exports.Pokemon = Pokemon;
function calcStat(gen, stat, base, iv, ev, level, nature) {
    return A.Stats.calcStat(typeof gen === 'number' ? data_1.Generations.get(gen) : gen, stat === 'spc' ? 'spa' : stat, base, iv, ev, level, nature);
}
exports.calcStat = calcStat;
var field_1 = require("./field");
Object.defineProperty(exports, "Field", { enumerable: true, get: function () { return field_1.Field; } });
Object.defineProperty(exports, "Side", { enumerable: true, get: function () { return field_1.Side; } });
var result_1 = require("./result");
Object.defineProperty(exports, "Result", { enumerable: true, get: function () { return result_1.Result; } });
var index_1 = require("./data/index");
Object.defineProperty(exports, "Generations", { enumerable: true, get: function () { return index_1.Generations; } });
var util_1 = require("./util");
Object.defineProperty(exports, "toID", { enumerable: true, get: function () { return util_1.toID; } });
var abilities_1 = require("./data/abilities");
Object.defineProperty(exports, "ABILITIES", { enumerable: true, get: function () { return abilities_1.ABILITIES; } });
var items_1 = require("./data/items");
Object.defineProperty(exports, "ITEMS", { enumerable: true, get: function () { return items_1.ITEMS; } });
Object.defineProperty(exports, "MEGA_STONES", { enumerable: true, get: function () { return items_1.MEGA_STONES; } });
var moves_1 = require("./data/moves");
Object.defineProperty(exports, "MOVES", { enumerable: true, get: function () { return moves_1.MOVES; } });
var species_1 = require("./data/species");
Object.defineProperty(exports, "SPECIES", { enumerable: true, get: function () { return species_1.SPECIES; } });
var natures_1 = require("./data/natures");
Object.defineProperty(exports, "NATURES", { enumerable: true, get: function () { return natures_1.NATURES; } });
var types_1 = require("./data/types");
Object.defineProperty(exports, "TYPE_CHART", { enumerable: true, get: function () { return types_1.TYPE_CHART; } });
var stats_1 = require("./stats");
Object.defineProperty(exports, "STATS", { enumerable: true, get: function () { return stats_1.STATS; } });
Object.defineProperty(exports, "Stats", { enumerable: true, get: function () { return stats_1.Stats; } });
//# sourceMappingURL=index.js.map