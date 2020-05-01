import React from 'react'
import { useSelector } from 'react-redux'
import {
  setFilteredKnownSpells,
  setFilteredPreparedSpells,
  setKnownSpellsFilter,
  setPreparedSpellsFilter
} from '../redux/actions'
import CharacterSelect from '../components/CharacterSelect'
import SpellGroup from '../components/SpellGroup'
import './SpellBook.css'

const SpellBook = () => {
  const user = useSelector(state => state.user)
  const characters = useSelector(state => state.characters)

  return (
    <div className="SpellBook-container">
      {user && <CharacterSelect key="select" />}
      <p className="Description-text">
        {!user
          ? 'Create an account in order to create characters and manage their known and prepared spells.'
          : !characters || characters.length === 0
          ? 'Create a character to get started with managing your spells.'
          : "Click the book icon to manage your spells. A closed book means you know the spell, and an open book means you've prepared the spell."}
      </p>
      {characters &&
        characters.length !== 0 && [
          <SpellGroup
            title="Prepared Spells"
            spellStore="preparedspells"
            filteredSpellStore="filteredpreparedspells"
            filterName="preparedspellsfilter"
            setFilterFunc={setPreparedSpellsFilter}
            setSpellsFunc={setFilteredPreparedSpells}
            isSearchable={true}
            noSpellsFoundString="You have no spells prepared for the day."
            key="prepared"
          />,
          <SpellGroup
            title="Known Spells"
            spellStore="knownspells"
            filteredSpellStore="filteredknownspells"
            filterName="knownspellsfilter"
            setFilterFunc={setKnownSpellsFilter}
            setSpellsFunc={setFilteredKnownSpells}
            isSearchable={true}
            noSpellsFoundString="You know no unprepared spells."
            key="known"
          />
        ]}
    </div>
  )
}

export default SpellBook
