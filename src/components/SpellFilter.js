import React from 'react'
import Select from 'react-select'

// create filter for spells, to be passed to filter function
const makeFilter = results => {
  var filter = {}

  if (!results) return filter

  // eslint-disable-next-line
  results.map(result => {
    if (result.field) {
      if (filter[result.field]) filter[result.field].push(result.value)
      else filter[result.field] = [result.value]
    }
  })
  return filter
}

// filter spells according from react select choices
const filterData = (filter, data) => {
  // show all data if empty filter
  if (filter.length === 0 || !filter) return data

  // For each field, inlcude ANY of field, but must match ALL fields
  // For example: (A or B or C) and (1 or 2 3)
  const output = data.filter(spell => {
    for (var field in filter) {
      var fieldValue = filter[field]
      var spellValue = spell[field]
      if (Array.isArray(fieldValue) && !fieldValue.some(c => spellValue.indexOf(c) >= 0)) {
        return false
      }
      if (!Array.isArray(fieldValue) && !filter[field].includes(spell[field])) {
        return false
      }
    }
    return true
  })

  return output
}

const SpellFilter = ({ spells, onChange }) => {
  // options, field is included for parsing
  const options = [
    {
      label: 'School',
      options: [
        { value: 'Abjuration', label: '🛡️ Abjuration', field: 'school' },
        { value: 'Conjuration', label: '🦄 Conjuration', field: 'school' },
        { value: 'Divination', label: '🔮 Divination', field: 'school' },
        { value: 'Enchantment', label: '✨ Enchantment', field: 'school' },
        { value: 'Evocation', label: '💥 Evocation', field: 'school' },
        { value: 'Illusion', label: '🌫️ Illusion', field: 'school' },
        { value: 'Necromancy', label: '💀 Necromancy', field: 'school' },
        { value: 'Transmutation', label: '🎭 Transmutation', field: 'school' }
      ]
    },
    {
      label: 'Class',
      options: [
        { value: 'Druid', label: 'Druid', field: 'classes' },
        { value: 'Wizard', label: 'Wizard', field: 'classes' },
        { value: 'Sorcerer', label: 'Sorcerer', field: 'classes' },
        { value: 'Cleric', label: 'Cleric', field: 'classes' },
        { value: 'Paladin', label: 'Paladin', field: 'classes' },
        { value: 'Ranger', label: 'Ranger', field: 'classes' },
        { value: 'Ritual Caster', label: 'Ritual Caster', field: 'classes' },
        { value: 'Bard', label: 'Bard', field: 'classes' },
        { value: 'Warlock', label: 'Warlock', field: 'classes' }
      ]
    },

    {
      label: 'Level',
      options: [
        { value: 0, label: 'Cantrip', field: 'level_int' },
        { value: 1, label: 'Level 1', field: 'level_int' },
        { value: 2, label: 'Level 2', field: 'level_int' },
        { value: 3, label: 'Level 3', field: 'level_int' },
        { value: 4, label: 'Level 4', field: 'level_int' },
        { value: 5, label: 'Level 5', field: 'level_int' },
        { value: 6, label: 'Level 6', field: 'level_int' },
        { value: 7, label: 'Level 7', field: 'level_int' },
        { value: 8, label: 'Level 8', field: 'level_int' },
        { value: 9, label: 'Level 9', field: 'level_int' }
      ]
    },
    {
      label: 'Ritual Spell',
      options: [
        { value: 'yes', label: 'Is Ritual', field: 'ritual' },
        { value: 'no', label: 'Not Ritual', field: 'ritual' }
      ]
    },
    {
      label: 'Concentration Spell',
      options: [
        { value: 'yes', label: 'Is Concentration', field: 'concentration' },
        { value: 'no', label: 'Not Concentration', field: 'concentration' }
      ]
    },
    {
      label: 'Name',
      options: spells.map(spell => {
        return { value: spell.name, label: spell.name, field: 'name' }
      })
    }
  ]

  // search bar style
  const styles = {
    option: base => ({
      ...base,
      color: 'black'
    })
  }

  // component to display searcbar labels
  const formatGroupLabel = data => (
    <div>
      <span>{data.label}</span>
    </div>
  )

  return (
    <div style={{ marginLeft: 50, marginRight: 50, align: 'center' }}>
      <Select
        isMulti
        closeMenuOnSelect={false}
        onChange={selected => onChange(filterData(makeFilter(selected), spells))}
        styles={styles}
        formatGroupLabel={formatGroupLabel}
        options={options}
      />
    </div>
  )
}

export default SpellFilter
