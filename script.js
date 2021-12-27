// setup

const D6 = 6

const attribute_keys = {
    strength: "strength",
    constitution: "constitution",
    size: "size",
    dexterity: "dexterity",
    intelligence: "intelligence",
    power: "power",
    charisma: "charisma"
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

let attributes = { strength: 0, constitution: 0, size: 0, dexterity: 0, intelligence: 0, power: 0, charisma: 0 }

Object.keys(attribute_keys).forEach(a => attributes[attribute_keys[a]] = roll_attribute(attribute_pool_map[attribute_keys[a]]))

// TODO: move modifier back into assignment (roll) logic above... ?
attributes.size += 6
attributes.intelligence += 6

// ui elements

const strength_input = document.getElementById(attribute_keys.strength)
const constitution_input = document.getElementById(attribute_keys.constitution)
const size_input = document.getElementById(attribute_keys.size)
const dexterity_input = document.getElementById(attribute_keys.dexterity)
const intelligence_input = document.getElementById(attribute_keys.intelligence)
const power_input = document.getElementById(attribute_keys.power)
const charisma_input = document.getElementById(attribute_keys.charisma)

// show the results

strength_input.value = attributes[attribute_keys.strength]
constitution_input.value = attributes[attribute_keys.constitution]
size_input.value = attributes[attribute_keys.size]
dexterity_input.value = attributes[attribute_keys.dexterity]
intelligence_input.value = attributes[attribute_keys.intelligence]
power_input.value = attributes[attribute_keys.power]
charisma_input.value = attributes[attribute_keys.charisma]
