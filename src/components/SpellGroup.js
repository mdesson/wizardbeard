import React, { useState, useEffect } from 'react'
import Card from './Card'
import SpellFilter from './SpellFilter'
import './SpellGroup.css'

const SpellGroup = ({ title, isSearchable, spells, noSpellsFoundString }) => {
  const [filteredSpells, setFilteredSpells] = useState(spells)

  // Update list of spells on event, such as character or spellStatus change
  useEffect(() => {
    setFilteredSpells(spells)
  }, [spells])

  return (
    <div>
      <h1 className="Group-heading">{title}</h1>
      {isSearchable && <SpellFilter spells={spells} />}
      <div className="Spell-list">
        {filteredSpells.length ? (
          filteredSpells.map(s => <Card key={s.name} spell={s} />)
        ) : (
          <div className="Description-text">{noSpellsFoundString}</div>
        )}
      </div>
    </div>
  )
}
export default SpellGroup
