import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateAllCharacters } from '../redux/actions'
import './CharacterSelect.css'
const CharacterSelect = () => {
  const characters = useSelector(state => state.characters)
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
