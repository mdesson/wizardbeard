import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllSpells, setFilteredSpells } from '../redux/actions'
import CharacterSelect from '../components/CharacterSelect'
import SpellGroup from '../components/SpellGroup'
import './SpellBook.css'

const SpellBook = () => {
  const spells = useSelector(state => state.allspells)
  const user = useSelector(state => state.user)
  const characters = useSelector(state => state.characters)
  const dispatch = useDispatch()

  const [knownSpells, setKnownSpells] = useState([])
  const [preparedSpells, setPreparedSpells] = useState([])

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
      dispatch(setFilteredSpells(allSpells))
    }
    if (spells.length === 0) {
      fetchData()
    }
    // eslint-disable-next-line
  }, [])

  // If character or their spells change
  useEffect(() => {
    if (!characters) return

    let character = characters.find(char => char.selected)
    if (!character.spells) return

    let known = character.spells.known.map(knownSpell =>
      spells.find(spell => spell.name === knownSpell)
    )
    let prepared = character.spells.prepared.map(knownSpell =>
      spells.find(spell => spell.name === knownSpell)
    )

    setKnownSpells(known)
    setPreparedSpells(prepared)
  }, [characters, spells])

  return (
    <div className="SpellBook-container">
      {user && [
        <CharacterSelect key="select" />,
        <SpellGroup
          title="Prepared Spells"
          spells={knownSpells}
          isSearchable={false}
          noSpellsFoundString="You have no spells prepared for the day."
          key="prepared"
        />,
        <SpellGroup
          title="Known Spells"
          spells={preparedSpells}
          isSearchable={true}
          noSpellsFoundString="You know no unprepared spells."
          key="known"
        />
      ]}
    </div>
  )
}

export default SpellBook
