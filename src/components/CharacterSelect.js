import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCharacter } from '../redux/actions'
import './CharacterSelect.css'
const CharacterSelect = () => {
  const characters = useSelector(state => state.characters)
  const dispatch = useDispatch()

  const selectCharacter = name => {
    // Deselect selected character
    let oldChar = characters.find(char => char.selected)
    let newChar = {
      name: oldChar.name,
      level: oldChar.level,
      class: oldChar.class
    }
    dispatch(updateCharacter({ oldChar: oldChar, newChar: newChar }))

    // Mark clicked character as selected
    oldChar = characters.find(char => char.name === name)
    newChar = { ...oldChar, selected: true }
    dispatch(updateCharacter({ oldChar: oldChar, newChar: newChar }))
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
