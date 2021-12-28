// utility

const double = x => x * 2
const halve = x => x / 2
const in_numeric_range = (value, start, end) => ((value >= start) && (value <= end))
const make_array = list_or_value => [].concat(list_or_value)
const sum_values = values => values.reduce((a, b) => a + b)
const ui_set_label_for_element = (element, text) => element.parentElement.getElementsByTagName("label")[0].innerText = text

// setup

const D6 = 6

const attribute_keys = {
    primary: {
        strength: "strength",
        constitution: "constitution",
        size: "size",
        dexterity: "dexterity",
        intelligence: "intelligence",
        power: "power",
        charisma: "charisma"
    },

    secondary: {
        action_points: "action_points",
        damage_modifier: "damage_modifier",
        experience_modifier: "experience_modifier",
        healing_rate: "healing_rate",
        initiative_bonus: "initiative_bonus",
        luck_points: "luck_points",
        magic_power_points: "magic_power_points"    
    }
}

const standard_skills = {
    athletics: {id: "athletics", name: "Athletics", fn_calc_default: (str, dex) => sum_values([str, dex])},
    boating: {id: "boating", name: "Boating", fn_calc_default: (str, con) => sum_values([str, con])},
    brawn: {id: "brawn", name: "Brawn", fn_calc_default: (str, siz) => sum_values([str, siz])},
    conceal: {id: "conceal", name: "Conceal", fn_calc_default: (dex, pow) => sum_values([dex, pow])},
    customs: {id: "customs", name: "Customs", fn_calc_default: int => double(int)},
    dance: {id: "dance", name: "Dance", fn_calc_default: (dex, cha) => sum_values([dex, cha])},
    deceit: {id: "deceit", name: "Deceit", fn_calc_default: (int, cha) => sum_values([int, cha])},
    drive: {id: "drive", name: "Drive", fn_calc_default: (dex, pow) => sum_values([dex, pow])},
    endurance: {id: "endurance", name: "Endurance", fn_calc_default: con => double(con)},
    evade: {id: "evade", name: "Evade", fn_calc_default: dex => double(dex)},
    first_aid: {id: "first_aid", name: "First Aid", fn_calc_default: (int, dex) => sum_values([int, dex])},
    influence: {id: "influence", name: "Influence", fn_calc_default: cha => double(cha)},
    insight: {id: "insight", name: "Insight", fn_calc_default: (int, pow) => sum_values([int, pow])},
    locale: {id: "locale", name: "Locale", fn_calc_default: int => double(int)},
    native_tongue: {id: "native_tongue", name: "Native Tongue", fn_calc_default: (int, cha) => sum_values([int, cha])},
    perception: {id: "perception", name: "Perception", fn_calc_default: (int, pow) => sum_values([int, pow])},
    ride: {id: "ride", name: "Ride", fn_calc_default: (dex, pow) => sum_values([dex, pow])},
    sing: {id: "sing", name: "Sing", fn_calc_default: (cha, pow) => sum_values([cha, pow])},
    stealth: {id: "stealth", name: "Stealth", fn_calc_default: (dex, int) => sum_values([dex, int])},
    swim: {id: "swim", name: "Swim", fn_calc_default: (str, con) => sum_values([str, con])},
    unarmed: {id: "unarmed", name: "Unarmed", fn_calc_default: (str, dex) => sum_values([str, dex])},
    willpower: {id: "willpower", name: "Willpower", fn_calc_default: pow => double(pow)}
}

const professional_skills = {
    acting: {id: "acting", name: "Acting", fn_calc_default: cha => double(cha)},
    acrobatics: {id: "acrobatics", name: "Acrobatics", fn_calc_default: (str, dex) => sum_values([str, dex])},
    art: {id: "art", name: "Art", fn_calc_default: (pow, cha) => sum_values([pow, cha])},
    astrogation: {id: "astrogation", name: "Astrogation", fn_calc_default: int => double(int)},
    bureaucracy: {id: "bureaucracy", name: "Bureaucracy", fn_calc_default: int => double(int)},
    commerce: {id: "commerce", name: "Commerce", fn_calc_default: (int, cha) => sum_values([int, cha])},
    comms: {id: "comms", name: "Comms", fn_calc_default: int => double(int)},
    computers: {id: "computers", name: "Computers", fn_calc_default: int => double(int)},
    courtesy: {id: "courtesy", name: "Courtesy", fn_calc_default: (int, cha) => sum_values([int, cha])},
    craft: {id: "craft", name: "Craft", fn_calc_default: (dex, int) => sum_values([dex, int])},
    culture: {id: "culture", name: "Culture", fn_calc_default: int => double(int)},
    demolitions: {id: "demolitions", name: "Demolitions", fn_calc_default: (int, pow) => sum_values([int, pow])},
    disguise: {id: "disguise", name: "Disguise", fn_calc_default: (int, cha) => sum_values([int, cha])},
    electronics: {id: "electronics", name: "Electronics", fn_calc_default: (dex, int) => sum_values([dex, int])},
    engineering: {id: "engineering", name: "Engineering", fn_calc_default: int => double(int)},
    forgery: {id: "forgery", name: "Forgery", fn_calc_default: (dex, int) => sum_values([dex, int])},
    gambling: {id: "gambling", name: "Gambling", fn_calc_default: (int, pow) => sum_values([int, pow])},
    healing: {id: "healing", name: "Healing", fn_calc_default: (int, pow) => sum_values([int, pow])},
    language: {id: "language", name: "Language", fn_calc_default: (int, cha) => sum_values([int, cha])},
    literacy: {id: "literacy", name: "Literacy", fn_calc_default: int => double(int)},
    lockpicking: {id: "lockpicking", name: "Lockpicking", fn_calc_default: dex => double(dex)},
    lore: {id: "lore", name: "Lore", fn_calc_default: int => double(int)},
    magic: {id: "magic", name: "Magic", fn_calc_default: (pow, cha) => sum_values([pow, cha])},
    mechanisms: {id: "mechanisms", name: "Mechanisms", fn_calc_default: (dex, int) => sum_values([dex, int])},
    musicianship: {id: "musicianship", name: "Musicianship", fn_calc_default: (dex, cha) => sum_values([dex, cha])},
    navigation: {id: "navigation", name: "Navigation", fn_calc_default: (int, pow) => sum_values([int, pow])},
    oratory: {id: "oratory", name: "Oratory", fn_calc_default: (pow, cha) => sum_values([pow, cha])},
    pilot: {id: "pilot", name: "Pilot", fn_calc_default: (dex, int) => sum_values([dex, int])},
    politics: {id: "politics", name: "Politics", fn_calc_default: (int, cha) => sum_values([int, cha])},
    research: {id: "research", name: "Research", fn_calc_default: (int, pow) => sum_values([int, pow])},
    science: {id: "science", name: "Science", fn_calc_default: int => double(int)},
    seamanship: {id: "seamanship", name: "Seamanship", fn_calc_default: (int, con) => sum_values([int, con])},
    seduction: {id: "seduction", name: "Seduction", fn_calc_default: (int, cha) => sum_values([int, cha])},
    sensors: {id: "sensors", name: "Sensors", fn_calc_default: (int, pow) => sum_values([int, pow])},
    sleight: {id: "sleight", name: "Sleight", fn_calc_default: (dex, cha) => sum_values([dex, cha])},
    streetwise: {id: "streetwise", name: "Streetwise", fn_calc_default: (pow, cha) => sum_values([pow, cha])},
    survival: {id: "survival", name: "Survival", fn_calc_default: (con, pow) => sum_values([con, pow])},
    teach: {id: "teach", name: "Teach", fn_calc_default: (int, cha) => sum_values([int, cha])},
    track: {id: "track", name: "Track", fn_calc_default: (int, con) => sum_values([int, con])}
}

const combat_skills = {
    combat_style: {id: "combat_style", name: "Combat Style", fn_calc_default: (str, dex) => sum_values([str, dex])}
}

const make_pool = die_sizes => make_array(die_sizes)
const roll_die = sides => Math.floor(Math.random() * sides) + 1
const roll_pool = pool => pool.map(roll_die)
const sum_pool = pool => sum_values(pool)
const roll_attribute = (pool, modifier) => sum_pool(roll_pool(pool)) + (modifier ? modifier : 0)

const calc_action_points = (int, dex) => Math.floor((int + dex) / 12) + 1
const calc_damage_modifier = (str, siz) => {
    let total = sum_values([str, siz])
    let modifier = ""

    if (in_numeric_range(total, 0, 5)) {
        modifier = "-1D8"
    }
    else if (in_numeric_range(total, 6, 10)) {
        modifier = "-1D6"
    }
    else if (in_numeric_range(total, 11, 15)) {
        modifier = "-1D4"
    }
    else if (in_numeric_range(total, 16, 20)) {
        modifier = "-1D2"
    }
    else if (in_numeric_range(total, 21, 25)) {
        modifier = "+0"
    }
    else if (in_numeric_range(total, 26, 30)) {
        modifier = "+1D2"
    }
    else if (in_numeric_range(total, 31, 35)) {
        modifier = "+1D4"
    }
    else if (in_numeric_range(total, 36, 40)) {
        modifier = "+1D6"
    }
    else {
        modifier = "{special}"
    }

    return modifier
}
const calc_experience_modifier = (cha) => Math.floor(cha / 6) - 1
const calc_healing_rate = (con) => Math.floor(con / 6) + 1
const calc_initiative_bonus = (int, dex) => halve(sum_values([int, dex]))
const calc_magic_points = (pow) => pow
const calc_luck_points = (pow) => Math.floor(pow / 6) + 1
const calc_hit_points = (con, siz) => {
    let total = sum_values([con, siz])
    let hit_points = {
        head: 0,
        chest: 0,
        abdomen: 0,
        each_arm: 0,
        each_leg: 0
    }

    if (in_numeric_range(total, 1, 5)) {
        hit_points = {
            head: 1,
            chest: 3,
            abdomen: 2,
            each_arm: 1,
            each_leg: 1
        }
    }
    else if (in_numeric_range(total, 6, 10)) {
        hit_points = {
            head: 2,
            chest: 4,
            abdomen: 3,
            each_arm: 1,
            each_leg: 2
        }
    }
    else if (in_numeric_range(total, 11, 15)) {
        hit_points = {
            head: 3,
            chest: 5,
            abdomen: 4,
            each_arm: 2,
            each_leg: 3
        }
    }
    else if (in_numeric_range(total, 16, 20)) {
        hit_points = {
            head: 4,
            chest: 6,
            abdomen: 5,
            each_arm: 3,
            each_leg: 4
        }
    }
    else if (in_numeric_range(total, 21, 25)) {
        hit_points = {
            head: 5,
            chest: 7,
            abdomen: 6,
            each_arm: 4,
            each_leg: 5
        }
    }
    else if (in_numeric_range(total, 26, 30)) {
        hit_points = {
            head: 6,
            chest: 8,
            abdomen: 7,
            each_arm: 5,
            each_leg: 6
        }
    }
    else if (in_numeric_range(total, 31, 35)) {
        hit_points = {
            head: 7,
            chest: 9,
            abdomen: 8,
            each_arm: 6,
            each_leg: 7
        }
    }
    else if (in_numeric_range(total, 36, 40)) {
        hit_points = {
            head: 8,
            chest: 10,
            abdomen: 9,
            each_arm: 7,
            each_leg: 8
        }
    }
    else {
        // PASS: leave as is
    }

    return hit_points
}

const pool_2D6 = make_pool([D6, D6])
const pool_3D6 = make_pool([D6, D6, D6])

const attribute_pool_map = {
    strength: pool_3D6,
    constitution: pool_3D6,
    size: pool_2D6,
    dexterity: pool_3D6,
    intelligence: pool_2D6,
    power: pool_3D6,
    charisma: pool_3D6
}

// do the math

let attributes = { 
    primary: {
        strength: 0, 
        constitution: 0, 
        size: 0, 
        dexterity: 0, 
        intelligence: 0, 
        power: 0, 
        charisma: 0 
    },
    secondary: {
        action_points: 0,
        damage_modifier: "",
        experience_modifier: 0,
        healing_rate: 0,
        initiative_bonus: 0,
        luck_points: 0,
        magic_power_points: 0,
        hit_points: {
            head: 0,
            chest: 0,
            abdomen: 0,
            each_arm: 0,
            each_leg: 0
        }
    },
    skills: {
        standard: {
            athletics: 0,
            boating: 0,
            brawn: 0,
            conceal: 0,
            customs: 0,
            dance: 0,
            deceit: 0,
            drive: 0,
            endurance: 0,
            evade: 0,
            first_aid: 0,
            influence: 0,
            insight: 0,
            locale: 0,
            native_tongue: 0,
            perception: 0,
            ride: 0,
            sing: 0,
            stealth: 0,
            swim: 0,
            unarmed: 0,
            willpower: 0
        },
        professional: {
            acting: 0,
            acrobatics: 0,
            art: 0,
            astrogation: 0,
            bureaucracy: 0,
            commerce: 0,
            comms: 0,
            computers: 0,
            courtesy: 0,
            craft: 0,
            culture: 0,
            demolitions: 0,
            disguise: 0,
            electronics: 0,
            engineering: 0,
            forgery: 0,
            gambling: 0,
            healing: 0,
            language: 0,
            literacy: 0,
            lockpicking: 0,
            lore: 0,
            magic: 0,
            mechanisms: 0,
            musicianship: 0,
            navigation: 0,
            oratory: 0,
            pilot: 0,
            politics: 0,
            research: 0,
            science: 0,
            seamanship: 0,
            seduction: 0,
            sensors: 0,
            sleight: 0,
            streetwise: 0,
            survival: 0,
            teach: 0,
            track: 0
        }
    }
}

Object.keys(attribute_keys.primary).forEach(
    a => 
        attributes.primary[attribute_keys.primary[a]] = 
            roll_attribute(attribute_pool_map[attribute_keys.primary[a]])
)

// TODO: move modifier back into assignment (roll) logic above... ?
attributes.primary.size += 6
attributes.primary.intelligence += 6

attributes.secondary.action_points = calc_action_points(attributes.primary.intelligence, attributes.primary.dexterity)
attributes.secondary.damage_modifier = calc_damage_modifier(attributes.primary.strength, attributes.primary.size)
attributes.secondary.experience_modifier = calc_experience_modifier(attributes.primary.charisma)
attributes.secondary.healing_rate = calc_healing_rate(attributes.primary.constitution)
attributes.secondary.initiative_bonus = calc_initiative_bonus(attributes.primary.intelligence, attributes.primary.dexterity)
attributes.secondary.magic_power_points = calc_magic_points(attributes.primary.power)
attributes.secondary.luck_points = calc_luck_points(attributes.primary.power)
attributes.secondary.hit_points = calc_hit_points(attributes.primary.constitution, attributes.primary.size)

attributes.skills.standard.athletics = standard_skills.athletics.fn_calc_default(attributes.primary.strength, attributes.primary.dexterity)
attributes.skills.standard.boating = standard_skills.boating.fn_calc_default(attributes.primary.strength, attributes.primary.constitution)
attributes.skills.standard.brawn = standard_skills.brawn.fn_calc_default(attributes.primary.strength, attributes.primary.size)
attributes.skills.standard.conceal = standard_skills.conceal.fn_calc_default(attributes.primary.dexterity, attributes.primary.power)
attributes.skills.standard.customs = standard_skills.customs.fn_calc_default(attributes.primary.intelligence)
attributes.skills.standard.dance = standard_skills.dance.fn_calc_default(attributes.primary.dexterity, attributes.primary.charisma)
attributes.skills.standard.deceit = standard_skills.deceit.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.standard.drive = standard_skills.drive.fn_calc_default(attributes.primary.dexterity, attributes.primary.power)
attributes.skills.standard.endurance = standard_skills.endurance.fn_calc_default(attributes.primary.constitution)
attributes.skills.standard.evade = standard_skills.evade.fn_calc_default(attributes.primary.dexterity)
attributes.skills.standard.first_aid = standard_skills.first_aid.fn_calc_default(attributes.primary.intelligence, attributes.primary.dexterity)
attributes.skills.standard.influence = standard_skills.influence.fn_calc_default(attributes.primary.charisma)
attributes.skills.standard.insight = standard_skills.insight.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.standard.locale = standard_skills.locale.fn_calc_default(attributes.primary.intelligence)
attributes.skills.standard.native_tongue = standard_skills.native_tongue.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.standard.perception = standard_skills.perception.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.standard.ride = standard_skills.ride.fn_calc_default(attributes.primary.dexterity, attributes.primary.power)
attributes.skills.standard.sing = standard_skills.sing.fn_calc_default(attributes.primary.charisma, attributes.primary.power)
attributes.skills.standard.stealth = standard_skills.stealth.fn_calc_default(attributes.primary.dexterity, attributes.primary.intelligence)
attributes.skills.standard.swim = standard_skills.swim.fn_calc_default(attributes.primary.strength, attributes.primary.constitution)
attributes.skills.standard.unarmed = standard_skills.unarmed.fn_calc_default(attributes.primary.strength, attributes.primary.dexterity)
attributes.skills.standard.willpower = standard_skills.willpower.fn_calc_default(attributes.primary.power)

attributes.skills.professional.acting = professional_skills.acting.fn_calc_default(attributes.primary.charisma)
attributes.skills.professional.acrobatics = professional_skills.acrobatics.fn_calc_default(attributes.primary.strength, attributes.primary.dexterity)
attributes.skills.professional.art = professional_skills.art.fn_calc_default(attributes.primary.power, attributes.primary.charisma)
attributes.skills.professional.astrogation = professional_skills.astrogation.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.bureaucracy = professional_skills.bureaucracy.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.commerce = professional_skills.commerce.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.professional.comms = professional_skills.comms.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.computers = professional_skills.computers.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.courtesy = professional_skills.courtesy.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.professional.craft = professional_skills.craft.fn_calc_default(attributes.primary.dexterity, attributes.primary.intelligence)
attributes.skills.professional.culture = professional_skills.culture.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.demolitions = professional_skills.demolitions.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.professional.disguise = professional_skills.disguise.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.professional.electronics = professional_skills.electronics.fn_calc_default(attributes.primary.dexterity, attributes.primary.intelligence)
attributes.skills.professional.engineering = professional_skills.engineering.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.forgery = professional_skills.forgery.fn_calc_default(attributes.primary.dexterity, attributes.primary.intelligence)
attributes.skills.professional.gambling = professional_skills.gambling.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.professional.healing = professional_skills.healing.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.professional.language = professional_skills.language.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.professional.literacy = professional_skills.literacy.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.lockpicking = professional_skills.lockpicking.fn_calc_default(attributes.primary.dexterity)
attributes.skills.professional.lore = professional_skills.lore.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.magic = professional_skills.magic.fn_calc_default(attributes.primary.power, attributes.primary.charisma)
attributes.skills.professional.mechanisms = professional_skills.mechanisms.fn_calc_default(attributes.primary.dexterity, attributes.primary.intelligence)
attributes.skills.professional.musicianship = professional_skills.musicianship.fn_calc_default(attributes.primary.dexterity, attributes.primary.charisma)
attributes.skills.professional.navigation = professional_skills.navigation.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.professional.oratory = professional_skills.oratory.fn_calc_default(attributes.primary.power, attributes.primary.charisma)
attributes.skills.professional.pilot = professional_skills.pilot.fn_calc_default(attributes.primary.dexterity, attributes.primary.intelligence)
attributes.skills.professional.politics = professional_skills.politics.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.professional.research = professional_skills.research.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.professional.science = professional_skills.science.fn_calc_default(attributes.primary.intelligence)
attributes.skills.professional.seamanship = professional_skills.seamanship.fn_calc_default(attributes.primary.intelligence, attributes.primary.constitution)
attributes.skills.professional.seduction = professional_skills.seduction.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.professional.sensors = professional_skills.sensors.fn_calc_default(attributes.primary.intelligence, attributes.primary.power)
attributes.skills.professional.sleight = professional_skills.sleight.fn_calc_default(attributes.primary.dexterity, attributes.primary.charisma)
attributes.skills.professional.streetwise = professional_skills.streetwise.fn_calc_default(attributes.primary.power, attributes.primary.charisma)
attributes.skills.professional.survival = professional_skills.survival.fn_calc_default(attributes.primary.constitution, attributes.primary.power)
attributes.skills.professional.teach = professional_skills.teach.fn_calc_default(attributes.primary.intelligence, attributes.primary.charisma)
attributes.skills.professional.track = professional_skills.track.fn_calc_default(attributes.primary.intelligence, attributes.primary.constitution)

// ui elements

const strength_input = document.getElementById(attribute_keys.primary.strength)
const constitution_input = document.getElementById(attribute_keys.primary.constitution)
const size_input = document.getElementById(attribute_keys.primary.size)
const dexterity_input = document.getElementById(attribute_keys.primary.dexterity)
const intelligence_input = document.getElementById(attribute_keys.primary.intelligence)
const power_input = document.getElementById(attribute_keys.primary.power)
const charisma_input = document.getElementById(attribute_keys.primary.charisma)

const action_points_input = document.getElementById(attribute_keys.secondary.action_points)
const damage_modifier_input = document.getElementById(attribute_keys.secondary.damage_modifier)
const experience_modifier_input = document.getElementById(attribute_keys.secondary.experience_modifier)
const healing_rate_input = document.getElementById(attribute_keys.secondary.healing_rate)
const initiative_bonus_input = document.getElementById(attribute_keys.secondary.initiative_bonus)
const luck_points_input = document.getElementById(attribute_keys.secondary.luck_points)
const magic_power_points_input = document.getElementById(attribute_keys.secondary.magic_power_points)

const head_input = document.getElementById("head")
const chest_input = document.getElementById("chest")
const abdomen_input = document.getElementById("abdomen")
const each_arm_input = document.getElementById("each_arm")
const each_leg_input = document.getElementById("each_leg")

const standard_skills_athletics_input = document.getElementById(standard_skills.athletics.id)
const standard_skills_boating_input = document.getElementById(standard_skills.boating.id)
const standard_skills_brawn_input = document.getElementById(standard_skills.brawn.id)
const standard_skills_conceal_input = document.getElementById(standard_skills.conceal.id)
const standard_skills_customs_input = document.getElementById(standard_skills.customs.id)
const standard_skills_dance_input = document.getElementById(standard_skills.dance.id)
const standard_skills_deceit_input = document.getElementById(standard_skills.deceit.id)
const standard_skills_drive_input = document.getElementById(standard_skills.drive.id)
const standard_skills_endurance_input = document.getElementById(standard_skills.endurance.id)
const standard_skills_evade_input = document.getElementById(standard_skills.evade.id)
const standard_skills_first_aid_input = document.getElementById(standard_skills.first_aid.id)
const standard_skills_influence_input = document.getElementById(standard_skills.influence.id)
const standard_skills_insight_input = document.getElementById(standard_skills.insight.id)
const standard_skills_locale_input = document.getElementById(standard_skills.locale.id)
const standard_skills_native_tongue_input = document.getElementById(standard_skills.native_tongue.id)
const standard_skills_perception_input = document.getElementById(standard_skills.perception.id)
const standard_skills_ride_input = document.getElementById(standard_skills.ride.id)
const standard_skills_sing_input = document.getElementById(standard_skills.sing.id)
const standard_skills_stealth_input = document.getElementById(standard_skills.stealth.id)
const standard_skills_swim_input = document.getElementById(standard_skills.swim.id)
const standard_skills_unarmed_input = document.getElementById(standard_skills.unarmed.id)
const standard_skills_willpower_input = document.getElementById(standard_skills.willpower.id)

const professional_skills_acting_input = document.getElementById(professional_skills.acting.id)
const professional_skills_acrobatics_input = document.getElementById(professional_skills.acrobatics.id)
const professional_skills_art_input = document.getElementById(professional_skills.art.id)
const professional_skills_astrogation_input = document.getElementById(professional_skills.astrogation.id)
const professional_skills_bureaucracy_input = document.getElementById(professional_skills.bureaucracy.id)
const professional_skills_commerce_input = document.getElementById(professional_skills.commerce.id)
const professional_skills_comms_input = document.getElementById(professional_skills.comms.id)
const professional_skills_computers_input = document.getElementById(professional_skills.computers.id)
const professional_skills_courtesy_input = document.getElementById(professional_skills.courtesy.id)
const professional_skills_craft_input = document.getElementById(professional_skills.craft.id)
const professional_skills_culture_input = document.getElementById(professional_skills.culture.id)
const professional_skills_demolitions_input = document.getElementById(professional_skills.demolitions.id)
const professional_skills_disguise_input = document.getElementById(professional_skills.disguise.id)
const professional_skills_electronics_input = document.getElementById(professional_skills.electronics.id)
const professional_skills_engineering_input = document.getElementById(professional_skills.engineering.id)
const professional_skills_forgery_input = document.getElementById(professional_skills.forgery.id)
const professional_skills_gambling_input = document.getElementById(professional_skills.gambling.id)
const professional_skills_healing_input = document.getElementById(professional_skills.healing.id)
const professional_skills_language_input = document.getElementById(professional_skills.language.id)
const professional_skills_literacy_input = document.getElementById(professional_skills.literacy.id)
const professional_skills_lockpicking_input = document.getElementById(professional_skills.lockpicking.id)
const professional_skills_lore_input = document.getElementById(professional_skills.lore.id)
const professional_skills_magic_input = document.getElementById(professional_skills.magic.id)
const professional_skills_mechanisms_input = document.getElementById(professional_skills.mechanisms.id)
const professional_skills_musicianship_input = document.getElementById(professional_skills.musicianship.id)
const professional_skills_navigation_input = document.getElementById(professional_skills.navigation.id)
const professional_skills_oratory_input = document.getElementById(professional_skills.oratory.id)
const professional_skills_pilot_input = document.getElementById(professional_skills.pilot.id)
const professional_skills_politics_input = document.getElementById(professional_skills.politics.id)
const professional_skills_research_input = document.getElementById(professional_skills.research.id)
const professional_skills_science_input = document.getElementById(professional_skills.science.id)
const professional_skills_seamanship_input = document.getElementById(professional_skills.seamanship.id)
const professional_skills_seduction_input = document.getElementById(professional_skills.seduction.id)
const professional_skills_sensors_input = document.getElementById(professional_skills.sensors.id)
const professional_skills_sleight_input = document.getElementById(professional_skills.sleight.id)
const professional_skills_streetwise_input = document.getElementById(professional_skills.streetwise.id)
const professional_skills_survival_input = document.getElementById(professional_skills.survival.id)
const professional_skills_teach_input = document.getElementById(professional_skills.teach.id)
const professional_skills_track_input = document.getElementById(professional_skills.track.id)

// show the results

ui_set_label_for_element(standard_skills_athletics_input, standard_skills.athletics.name)
ui_set_label_for_element(standard_skills_boating_input, standard_skills.boating.name)
ui_set_label_for_element(standard_skills_brawn_input, standard_skills.brawn.name)
ui_set_label_for_element(standard_skills_conceal_input, standard_skills.conceal.name)
ui_set_label_for_element(standard_skills_customs_input, standard_skills.customs.name)
ui_set_label_for_element(standard_skills_dance_input, standard_skills.dance.name)
ui_set_label_for_element(standard_skills_deceit_input, standard_skills.deceit.name)
ui_set_label_for_element(standard_skills_drive_input, standard_skills.drive.name)
ui_set_label_for_element(standard_skills_endurance_input, standard_skills.endurance.name)
ui_set_label_for_element(standard_skills_evade_input, standard_skills.evade.name)
ui_set_label_for_element(standard_skills_first_aid_input, standard_skills.first_aid.name)
ui_set_label_for_element(standard_skills_influence_input, standard_skills.influence.name)
ui_set_label_for_element(standard_skills_insight_input, standard_skills.insight.name)
ui_set_label_for_element(standard_skills_locale_input, standard_skills.locale.name)
ui_set_label_for_element(standard_skills_native_tongue_input, standard_skills.native_tongue.name)
ui_set_label_for_element(standard_skills_perception_input, standard_skills.perception.name)
ui_set_label_for_element(standard_skills_ride_input, standard_skills.ride.name)
ui_set_label_for_element(standard_skills_sing_input, standard_skills.sing.name)
ui_set_label_for_element(standard_skills_stealth_input, standard_skills.stealth.name)
ui_set_label_for_element(standard_skills_swim_input, standard_skills.swim.name)
ui_set_label_for_element(standard_skills_unarmed_input, standard_skills.unarmed.name)
ui_set_label_for_element(standard_skills_willpower_input, standard_skills.willpower.name)

ui_set_label_for_element(professional_skills_acting_input, professional_skills.acting.name)
ui_set_label_for_element(professional_skills_acrobatics_input, professional_skills.acrobatics.name)
ui_set_label_for_element(professional_skills_art_input, professional_skills.art.name)
ui_set_label_for_element(professional_skills_astrogation_input, professional_skills.astrogation.name)
ui_set_label_for_element(professional_skills_bureaucracy_input, professional_skills.bureaucracy.name)
ui_set_label_for_element(professional_skills_commerce_input, professional_skills.commerce.name)
ui_set_label_for_element(professional_skills_comms_input, professional_skills.comms.name)
ui_set_label_for_element(professional_skills_computers_input, professional_skills.computers.name)
ui_set_label_for_element(professional_skills_courtesy_input, professional_skills.courtesy.name)
ui_set_label_for_element(professional_skills_craft_input, professional_skills.craft.name)
ui_set_label_for_element(professional_skills_culture_input, professional_skills.culture.name)
ui_set_label_for_element(professional_skills_demolitions_input, professional_skills.demolitions.name)
ui_set_label_for_element(professional_skills_disguise_input, professional_skills.disguise.name)
ui_set_label_for_element(professional_skills_electronics_input, professional_skills.electronics.name)
ui_set_label_for_element(professional_skills_engineering_input, professional_skills.engineering.name)
ui_set_label_for_element(professional_skills_forgery_input, professional_skills.forgery.name)
ui_set_label_for_element(professional_skills_gambling_input, professional_skills.gambling.name)
ui_set_label_for_element(professional_skills_healing_input, professional_skills.healing.name)
ui_set_label_for_element(professional_skills_language_input, professional_skills.language.name)
ui_set_label_for_element(professional_skills_literacy_input, professional_skills.literacy.name)
ui_set_label_for_element(professional_skills_lockpicking_input, professional_skills.lockpicking.name)
ui_set_label_for_element(professional_skills_lore_input, professional_skills.lore.name)
ui_set_label_for_element(professional_skills_magic_input, professional_skills.magic.name)
ui_set_label_for_element(professional_skills_mechanisms_input, professional_skills.mechanisms.name)
ui_set_label_for_element(professional_skills_musicianship_input, professional_skills.musicianship.name)
ui_set_label_for_element(professional_skills_navigation_input, professional_skills.navigation.name)
ui_set_label_for_element(professional_skills_oratory_input, professional_skills.oratory.name)
ui_set_label_for_element(professional_skills_pilot_input, professional_skills.pilot.name)
ui_set_label_for_element(professional_skills_politics_input, professional_skills.politics.name)
ui_set_label_for_element(professional_skills_research_input, professional_skills.research.name)
ui_set_label_for_element(professional_skills_science_input, professional_skills.science.name)
ui_set_label_for_element(professional_skills_seamanship_input, professional_skills.seamanship.name)
ui_set_label_for_element(professional_skills_seduction_input, professional_skills.seduction.name)
ui_set_label_for_element(professional_skills_sensors_input, professional_skills.sensors.name)
ui_set_label_for_element(professional_skills_sleight_input, professional_skills.sleight.name)
ui_set_label_for_element(professional_skills_streetwise_input, professional_skills.streetwise.name)
ui_set_label_for_element(professional_skills_survival_input, professional_skills.survival.name)
ui_set_label_for_element(professional_skills_teach_input, professional_skills.teach.name)
ui_set_label_for_element(professional_skills_track_input, professional_skills.track.name)

strength_input.value = attributes.primary[attribute_keys.primary.strength]
constitution_input.value = attributes.primary[attribute_keys.primary.constitution]
size_input.value = attributes.primary[attribute_keys.primary.size]
dexterity_input.value = attributes.primary[attribute_keys.primary.dexterity]
intelligence_input.value = attributes.primary[attribute_keys.primary.intelligence]
power_input.value = attributes.primary[attribute_keys.primary.power]
charisma_input.value = attributes.primary[attribute_keys.primary.charisma]

action_points_input.value = attributes.secondary[attribute_keys.secondary.action_points]
damage_modifier_input.value = attributes.secondary[attribute_keys.secondary.damage_modifier]
experience_modifier_input.value = attributes.secondary[attribute_keys.secondary.experience_modifier]
healing_rate_input.value = attributes.secondary[attribute_keys.secondary.healing_rate]
initiative_bonus_input.value = attributes.secondary[attribute_keys.secondary.initiative_bonus]
luck_points_input.value = attributes.secondary[attribute_keys.secondary.luck_points]
magic_power_points_input.value = attributes.secondary[attribute_keys.secondary.magic_power_points]

head_input.value = attributes.secondary["hit_points"].head
chest_input.value = attributes.secondary["hit_points"].chest
abdomen_input.value = attributes.secondary["hit_points"].abdomen
each_arm_input.value = attributes.secondary["hit_points"].each_arm
each_leg_input.value = attributes.secondary["hit_points"].each_leg

standard_skills_athletics_input.value = attributes.skills.standard[standard_skills.athletics.id]
standard_skills_boating_input.value = attributes.skills.standard[standard_skills.boating.id]
standard_skills_brawn_input.value = attributes.skills.standard[standard_skills.brawn.id]
standard_skills_conceal_input.value = attributes.skills.standard[standard_skills.conceal.id]
standard_skills_customs_input.value = attributes.skills.standard[standard_skills.customs.id]
standard_skills_dance_input.value = attributes.skills.standard[standard_skills.dance.id]
standard_skills_deceit_input.value = attributes.skills.standard[standard_skills.deceit.id]
standard_skills_drive_input.value = attributes.skills.standard[standard_skills.drive.id]
standard_skills_endurance_input.value = attributes.skills.standard[standard_skills.endurance.id]
standard_skills_evade_input.value = attributes.skills.standard[standard_skills.evade.id]
standard_skills_first_aid_input.value = attributes.skills.standard[standard_skills.first_aid.id]
standard_skills_influence_input.value = attributes.skills.standard[standard_skills.influence.id]
standard_skills_insight_input.value = attributes.skills.standard[standard_skills.insight.id]
standard_skills_locale_input.value = attributes.skills.standard[standard_skills.locale.id]
standard_skills_native_tongue_input.value = attributes.skills.standard[standard_skills.native_tongue.id]
standard_skills_perception_input.value = attributes.skills.standard[standard_skills.perception.id]
standard_skills_ride_input.value = attributes.skills.standard[standard_skills.ride.id]
standard_skills_sing_input.value = attributes.skills.standard[standard_skills.sing.id]
standard_skills_stealth_input.value = attributes.skills.standard[standard_skills.stealth.id]
standard_skills_swim_input.value = attributes.skills.standard[standard_skills.swim.id]
standard_skills_unarmed_input.value = attributes.skills.standard[standard_skills.unarmed.id]
standard_skills_willpower_input.value = attributes.skills.standard[standard_skills.willpower.id]

professional_skills_acting_input.value = attributes.skills.professional[professional_skills.acting.id]
professional_skills_acrobatics_input.value = attributes.skills.professional[professional_skills.acrobatics.id]
professional_skills_art_input.value = attributes.skills.professional[professional_skills.art.id]
professional_skills_astrogation_input.value = attributes.skills.professional[professional_skills.astrogation.id]
professional_skills_bureaucracy_input.value = attributes.skills.professional[professional_skills.bureaucracy.id]
professional_skills_commerce_input.value = attributes.skills.professional[professional_skills.commerce.id]
professional_skills_comms_input.value = attributes.skills.professional[professional_skills.comms.id]
professional_skills_computers_input.value = attributes.skills.professional[professional_skills.computers.id]
professional_skills_courtesy_input.value = attributes.skills.professional[professional_skills.courtesy.id]
professional_skills_craft_input.value = attributes.skills.professional[professional_skills.craft.id]
professional_skills_culture_input.value = attributes.skills.professional[professional_skills.culture.id]
professional_skills_demolitions_input.value = attributes.skills.professional[professional_skills.demolitions.id]
professional_skills_disguise_input.value = attributes.skills.professional[professional_skills.disguise.id]
professional_skills_electronics_input.value = attributes.skills.professional[professional_skills.electronics.id]
professional_skills_engineering_input.value = attributes.skills.professional[professional_skills.engineering.id]
professional_skills_forgery_input.value = attributes.skills.professional[professional_skills.forgery.id]
professional_skills_gambling_input.value = attributes.skills.professional[professional_skills.gambling.id]
professional_skills_healing_input.value = attributes.skills.professional[professional_skills.healing.id]
professional_skills_language_input.value = attributes.skills.professional[professional_skills.language.id]
professional_skills_literacy_input.value = attributes.skills.professional[professional_skills.literacy.id]
professional_skills_lockpicking_input.value = attributes.skills.professional[professional_skills.lockpicking.id]
professional_skills_lore_input.value = attributes.skills.professional[professional_skills.lore.id]
professional_skills_magic_input.value = attributes.skills.professional[professional_skills.magic.id]
professional_skills_mechanisms_input.value = attributes.skills.professional[professional_skills.mechanisms.id]
professional_skills_musicianship_input.value = attributes.skills.professional[professional_skills.musicianship.id]
professional_skills_navigation_input.value = attributes.skills.professional[professional_skills.navigation.id]
professional_skills_oratory_input.value = attributes.skills.professional[professional_skills.oratory.id]
professional_skills_pilot_input.value = attributes.skills.professional[professional_skills.pilot.id]
professional_skills_politics_input.value = attributes.skills.professional[professional_skills.politics.id]
professional_skills_research_input.value = attributes.skills.professional[professional_skills.research.id]
professional_skills_science_input.value = attributes.skills.professional[professional_skills.science.id]
professional_skills_seamanship_input.value = attributes.skills.professional[professional_skills.seamanship.id]
professional_skills_seduction_input.value = attributes.skills.professional[professional_skills.seduction.id]
professional_skills_sensors_input.value = attributes.skills.professional[professional_skills.sensors.id]
professional_skills_sleight_input.value = attributes.skills.professional[professional_skills.sleight.id]
professional_skills_streetwise_input.value = attributes.skills.professional[professional_skills.streetwise.id]
professional_skills_survival_input.value = attributes.skills.professional[professional_skills.survival.id]
professional_skills_teach_input.value = attributes.skills.professional[professional_skills.teach.id]
professional_skills_track_input.value = attributes.skills.professional[professional_skills.track.id]
