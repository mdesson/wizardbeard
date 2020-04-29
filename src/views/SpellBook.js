import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadAllSpells,
  setFilteredAllSpells,
  setFilteredKnownSpells,
  setFilteredPreparedSpells,
  setKnownSpellsFilter,
  setPreparedSpellsFilter
} from '../redux/actions'
import CharacterSelect from '../components/CharacterSelect'
import SpellGroup from '../components/SpellGroup'
import './SpellBook.css'

const SpellBook = () => {
  const spells = useSelector(state => state.allspells)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // If spells have not yet been loaded globally
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.open5e.com/spells/?format=json&limit=2000'
      )

      // add array of dnd classes
      const allSpells = result.data.results.map(spell => {
        return { ...spell, classes: spell.dnd_class.split(', ') }
      })

      dispatch(loadAllSpells(allSpells))
      dispatch(setFilteredAllSpells(allSpells))
    }
    if (spells.length === 0) {
      fetchData()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="SpellBook-container">
      <p className="Description-text">
        {user
          ? "Click the book icon to manage your spells. A closed book means you know the spell, and an open book means you've prepared the spell."
          : 'Create an account in order to create characters and manage their known and prepared spells.'}
      </p>
      {user && [
        <CharacterSelect key="select" />,
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
