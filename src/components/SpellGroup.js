import React from 'react'
import Card from './Card'
import SpellFilter from './SpellFilter'
import './SpellGroup.css'
import { useSelector } from 'react-redux'

const SpellGroup = ({
  title,
  addMode,
  isSearchable,
  spellStore,
  filteredSpellStore,
  filterName,
  setSpellsFunc,
  setFilterFunc,
  noSpellsFoundString
}) => {
  const spells = useSelector(state => state[spellStore])
  const filteredSpells = useSelector(state => state[filteredSpellStore])

  return (
    <div>
      {title && <h1 className="Group-heading">{title}</h1>}
      {isSearchable && (
        <SpellFilter
          spells={spells}
          filterName={filterName}
          setFilterFunc={setFilterFunc}
          setSpellsFunc={setSpellsFunc}
        />
      )}
      <div className="Spell-list">
        {filteredSpells.length ? (
          filteredSpells.map(s => (
            <Card addMode={addMode} key={s.name} spell={s} />
          ))
        ) : (
          <div className="Description-text">{noSpellsFoundString}</div>
        )}
      </div>
    </div>
  )
}
export default SpellGroup
