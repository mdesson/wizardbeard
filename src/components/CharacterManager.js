import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './CharacterManager.css'

// TODO: Sanitize user input
const CharacterRows = ({ characterArray }) => {
  return characterArray.map(character => <CharacterRow key={character.name} character={character} />)
}

const CharacterRow = ({ character }) => {
  return (
    <tr key={character.name}>
      <td>{character.name}</td>
      <td>{character.class}</td>
      <td>{character.level}</td>
      <td className='Account-button'>Modify</td>
    </tr>
  )
}

const Modal = ({ hideModal }) => {
  return (
    <div className='CharacterManager-modal'>
      <div className='CharacterManager-modal-content'>
        <span className='CharacterManager-modal-close' onClick={hideModal}>
          &times;
        </span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  )
}

const AddCharacter = () => {
  return <div></div>
}

const DeleteCharacter = () => {
  return <div></div>
}

const EditCharacter = () => {
  return <div></div>
}

const CharacterManager = () => {
  const [showModal, setShowModal] = useState(false)
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
      <div className='Account-button' onClick={() => setShowModal(true)}>
        Add New
      </div>
      {showModal && <Modal hideModal={() => setShowModal(false)} />}
    </div>
  )
}

export default CharacterManager
