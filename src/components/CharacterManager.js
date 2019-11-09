import React from 'react'
import { useSelector } from 'react-redux'
import './CharacterManager.css'

const CharacterRows = ({ characterArray }) => {
  return characterArray.map(character => (
    <tr key={character.name}>
      <td>{character.name}</td>
      <td>{character.class}</td>
      <td>{character.level}</td>
      <td className='Account-button'>Delete</td>
    </tr>
  ))
}

const CharacterManager = () => {
  const characters = useSelector(state => state.characters)

  return (
    <div className='CharacterManager-container'>
      <table className='CharacterManager-table'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Level</th>
            <th> </th>
          </tr>
          {characters.length && <CharacterRows characterArray={characters} />}
        </tbody>
      </table>
      {!characters.length && <div className='CharacterManager-message'>You haven't created any characters. Use the button below to get started!</div>}
      <div className='Account-button'>Add New</div>
    </div>
  )
}

export default CharacterManager
