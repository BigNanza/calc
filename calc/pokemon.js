"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const stats_1 = require("./stats");
const util_1 = require("./util");
const STATS = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
const SPC = new Set(['spc']);
class Pokemon {
    constructor(gen, name, options = {}) {
        this.species = (0, util_1.extend)(true, {}, gen.species.get((0, util_1.toID)(name)), options.overrides);
        this.gen = gen;
        this.name = options.name || name;
        this.types = this.species.types;
        this.weightkg = this.species.weightkg;
        this.level = options.level || 100;
        this.gender = options.gender || this.species.gender || 'M';
        this.ability = options.ability || this.species.abilities?.[0] || undefined;
        this.abilityOn = !!options.abilityOn;
        this.isDynamaxed = !!options.isDynamaxed;
        this.dynamaxLevel = this.isDynamaxed
            ? (options.dynamaxLevel === undefined ? 10 : options.dynamaxLevel) : undefined;
        this.alliesFainted = options.alliesFainted;
        this.boostedStat = options.boostedStat;
        this.teraType = options.teraType;
        this.item = options.item;
        this.nature = options.nature || 'Serious';
        this.ivs = Pokemon.withDefault(gen, options.ivs, 31);
        this.evs = Pokemon.withDefault(gen, options.evs, gen.num >= 3 ? 0 : 252);
        this.boosts = Pokemon.withDefault(gen, options.boosts, 0, false);
        if (this.weightkg === 0 && !this.isDynamaxed && this.species.baseSpecies) {
            this.weightkg = gen.species.get((0, util_1.toID)(this.species.baseSpecies)).weightkg;
        }
        if (gen.num < 3) {
            this.ivs.hp = stats_1.Stats.DVToIV(stats_1.Stats.getHPDV({
                atk: this.ivs.atk,
                def: this.ivs.def,
                spe: this.ivs.spe,
                spc: this.ivs.spa,
            }));
        }
        this.rawStats = {};
        this.stats = {};
        for (const stat of STATS) {
            const val = this.calcStat(gen, stat);
            this.rawStats[stat] = val;
            this.stats[stat] = val;
        }
        const curHP = options.curHP || options.originalCurHP;
        this.originalCurHP = curHP && curHP <= this.rawStats.hp ? curHP : this.rawStats.hp;
        this.status = options.status || '';
        this.toxicCounter = options.toxicCounter || 0;
        this.moves = options.moves || [];
    }
    maxHP(original = false) {
        if (!original && this.isDynamaxed && this.species.baseStats.hp !== 1) {
            return Math.floor((this.rawStats.hp * (150 + 5 * this.dynamaxLevel)) / 100);
        }
        return this.rawStats.hp;
    }
    curHP(original = false) {
        if (!original && this.isDynamaxed && this.species.baseStats.hp !== 1) {
            return Math.ceil((this.originalCurHP * (150 + 5 * this.dynamaxLevel)) / 100);
        }
        return this.originalCurHP;
    }
    hasAbility(...abilities) {
        return !!(this.ability && abilities.includes(this.ability));
    }
    hasItem(...items) {
        return !!(this.item && items.includes(this.item));
    }
    hasStatus(...statuses) {
        return !!(this.status && statuses.includes(this.status));
    }
    hasType(...types) {
        for (const type of types) {
            if (this.teraType && this.teraType !== 'Stellar'
                ? this.teraType === type : this.types.includes(type)) {
                return true;
            }
        }
        return false;
    }
    hasOriginalType(...types) {
        for (const type of types) {
            if (this.types.includes(type))
                return true;
        }
        return false;
    }
    named(...names) {
        return names.includes(this.name);
    }
    clone() {
        return new Pokemon(this.gen, this.name, {
            level: this.level,
            ability: this.ability,
            abilityOn: this.abilityOn,
            isDynamaxed: this.isDynamaxed,
            dynamaxLevel: this.dynamaxLevel,
            alliesFainted: this.alliesFainted,
            boostedStat: this.boostedStat,
            item: this.item,
            gender: this.gender,
            nature: this.nature,
            ivs: (0, util_1.extend)(true, {}, this.ivs),
            evs: (0, util_1.extend)(true, {}, this.evs),
            boosts: (0, util_1.extend)(true, {}, this.boosts),
            originalCurHP: this.originalCurHP,
            status: this.status,
            teraType: this.teraType,
            toxicCounter: this.toxicCounter,
            moves: this.moves.slice(),
            overrides: this.species,
        });
    }
    calcStat(gen, stat) {
        return stats_1.Stats.calcStat(gen, stat, this.species.baseStats[stat], this.ivs[stat], this.evs[stat], this.level, this.nature);
    }
    static getForme(gen, speciesName, item, moveName) {
        const species = gen.species.get((0, util_1.toID)(speciesName));
        if (!species?.otherFormes) {
            return speciesName;
        }
        let i = 0;
        if ((item &&
            ((item.includes('ite') && !item.includes('ite Y')) ||
                (speciesName === 'Groudon' && item === 'Red Orb') ||
                (speciesName === 'Kyogre' && item === 'Blue Orb'))) ||
            (moveName && speciesName === 'Meloetta' && moveName === 'Relic Song') ||
            (speciesName === 'Rayquaza' && moveName === 'Dragon Ascent')) {
            i = 1;
        }
        else if (item?.includes('ite Y')) {
            i = 2;
        }
        return i ? species.otherFormes[i - 1] : species.name;
    }
    static withDefault(gen, current, val, match = true) {
        const cur = {};
        if (current) {
            (0, util_1.assignWithout)(cur, current, SPC);
            if (current.spc) {
                cur.spa = current.spc;
                cur.spd = current.spc;
            }
            if (match && gen.num <= 2 && current.spa !== current.spd) {
                throw new Error('Special Attack and Special Defense must match before Gen 3');
            }
        }
        return { hp: val, atk: val, def: val, spa: val, spd: val, spe: val, ...cur };
    }
}
exports.Pokemon = Pokemon;
//# sourceMappingURL=pokemon.js.map