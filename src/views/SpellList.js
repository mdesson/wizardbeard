import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Card from '../components/Card.js'
import './SpellList.css'
import spells from '../mockdata.js'

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

const styles = {
  option: base => ({
    ...base,
    color: 'black'
  })
}

const formatGroupLabel = data => (
  <div>
    <span>{data.label}</span>
  </div>
)

const SpellList = () => {
  const [selected, setSelected] = useState()

  useEffect(() => {
    console.log(selected)
  })

  return (
    <div>
      <div className="Description-text">
        <div>
          Welcome to <b>Wizard Beard</b>! The most convenient place on this
          plane to manage your spells!
        </div>
      </div>
      <div style={{ marginLeft: 50, marginRight: 50, align: 'center' }}>
        <Select
          isMulti
          closeMenuOnSelect={false}
          onChange={val => setSelected(val)}
          styles={styles}
          formatGroupLabel={formatGroupLabel}
          options={options}
        />
      </div>
      <div className="Spell-list">
        {spells.map(s => (
          <Card key={s.name} spell={s} />
        ))}
      </div>
    </div>
  )
}

export default SpellList
