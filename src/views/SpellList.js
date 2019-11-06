import React from 'react'
import Select from 'react-select'
import Card from '../components/Card.js'
import './SpellList.css'
import spells from '../mockdata.js'

const options = [
  {
    label: 'School',
    options: [
      { value: 'Abjuration', label: '🛡️ Abjuration' },
      { value: 'Conjuration', label: '🦄 Conjuration' },
      { value: 'Divination', label: '🔮 Divination' },
      { value: 'Enchantment', label: '✨ Enchantment' },
      { value: 'Evocation', label: '💥 Evocation' },
      { value: 'Illusion', label: '🌫️ Illusion' },
      { value: 'Necromancy', label: '💀 Necromancy' },
      { value: 'Transmutation', label: '🎭 Transmutation' }
    ]
  },
  {
    label: 'Level',
    options: [
      { value: -1, label: 'Cantrip' },
      { value: 1, label: 'Level 1' },
      { value: 2, label: 'Level 2' },
      { value: 3, label: 'Level 3' },
      { value: 4, label: 'Level 4' },
      { value: 5, label: 'Level 5' },
      { value: 6, label: 'Level 6' },
      { value: 7, label: 'Level 7' },
      { value: 8, label: 'Level 8' },
      { value: 9, label: 'Level 9' }
    ]
  },
  {
    label: 'Ritual Spell',
    options: [
      { value: 'yes', label: 'Is Ritual' },
      { value: 'no', label: 'Not Ritual' }
    ]
  },
  {
    label: 'Concentration Spell',
    options: [
      { value: 'yes', label: 'Is Concentration' },
      { value: 'no', label: 'Not Concentration' }
    ]
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
          styles={styles}
          formatGroupLabel={formatGroupLabel}
          options={options}
        />
      </div>
      <div className="Spell-list">
        {spells.map(s => (
          <Card spell={s} />
        ))}
      </div>
    </div>
  )
}

export default SpellList
