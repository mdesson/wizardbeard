import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const CharacterSelect = () => {
  const characters = useSelector(state => state.characters)
  return (
    <div>
      {characters.map(char => (
        <div>{char.name}</div>
      ))}
    </div>
  )
}

export default CharacterSelect
