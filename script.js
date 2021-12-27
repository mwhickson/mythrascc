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

const make_pool = die_sizes => [].concat(die_sizes)
const roll_die = sides => Math.floor(Math.random() * sides) + 1
const roll_pool = pool => pool.map(roll_die)
const sum_pool = pool => pool.reduce((a, b) => a + b)
const roll_attribute = (pool, modifier) => sum_pool(roll_pool(pool)) + (modifier ? modifier : 0)

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
        damage_modifier: 0,
        experience_modifier: 0,
        healing_rate: 0,
        initiative_bonus: 0,
        luck_points: 0,
        magic_power_points: 0
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

// show the results

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
