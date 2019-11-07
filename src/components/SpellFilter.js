import React from 'react'
import Select from 'react-select'

// create filter for spells, to be passed to filter function
const makeFilter = results => {
  var filter = {}

  if (!results) return filter

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
      if (!filter[field].includes(spell[field])) {
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
      label: 'Level',
      options: [
        { value: -1, label: 'Cantrip', field: 'level' },
        { value: 1, label: 'Level 1', field: 'level' },
        { value: 2, label: 'Level 2', field: 'level' },
        { value: 3, label: 'Level 3', field: 'level' },
        { value: 4, label: 'Level 4', field: 'level' },
        { value: 5, label: 'Level 5', field: 'level' },
        { value: 6, label: 'Level 6', field: 'level' },
        { value: 7, label: 'Level 7', field: 'level' },
        { value: 8, label: 'Level 8', field: 'level' },
        { value: 9, label: 'Level 9', field: 'level' }
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
