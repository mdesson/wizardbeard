import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Card from '../components/Card.js'
import SpellFilter from '../components/SpellFilter.js'
import './SpellList.css'
import spells from '../mockdata.js'

const SpellList = () => {
  const [filteredSpells, setFilteredSpells] = useState(spells)

  return (
    <div>
      <div className="Description-text">
        <div>
          Welcome to <b>Wizard Beard</b>! The most convenient place on this plane to manage your spells!
        </div>
      </div>
      <SpellFilter onChange={setFilteredSpells} spells={spells} />
      <div className="Spell-list">
        {filteredSpells.length ? (
          filteredSpells.map(s => <Card key={s.name} spell={s} />)
        ) : (
          <div className="Description-text">Alas, such a spell has yet to be crafted.</div>
        )}
      </div>
    </div>
  )
}

export default SpellList
