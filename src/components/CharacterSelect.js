import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateAllCharacters,
  loadPreparedSpells,
  loadKnownSpells,
  setPreparedSpellsFilter,
  setKnownSpellsFilter,
  setFilteredKnownSpells,
  setFilteredPreparedSpells
} from '../redux/actions'
import './CharacterSelect.css'

const CharacterSelect = () => {
  const characters = useSelector(state => state.characters)
  const spells = useSelector(state => state.allspells)
  const dispatch = useDispatch()

  const selectCharacter = name => {
    // Remove selected from characters and add to newly select character
    const allCharacters = characters.map(char =>
      name === char.name
        ? {
            ...char,
            selected: true
          }
        : {
            ...char,
            selected: false
          }
    )
    dispatch(updateAllCharacters(allCharacters))

    // Update prepared and known spells
    let character = allCharacters.find(char => char.selected)

    let known = character.spells.known.map(knownSpell =>
      spells.find(spell => spell.name === knownSpell)
    )
    let prepared = character.spells.prepared.map(knownSpell =>
      spells.find(spell => spell.name === knownSpell)
    )
    dispatch(loadPreparedSpells(prepared))
    dispatch(loadKnownSpells(known))

    // clear spell filters for known and prepared spells
    dispatch(setFilteredPreparedSpells(prepared))
    dispatch(setFilteredKnownSpells(known))
    dispatch(setPreparedSpellsFilter([]))
    dispatch(setKnownSpellsFilter([]))
  }
  return (
    <div className="character-select-container">
      {characters.map(char => (
        <div
          className={char.selected ? 'character-selected' : 'character'}
          onClick={() => !char.selected && selectCharacter(char.name)}
          key={char.name}
        >
          {char.name}
        </div>
      ))}
    </div>
  )
}

export default CharacterSelect
