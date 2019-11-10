import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './CharacterManager.css'
import { create } from 'domain'

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

const Modal = ({ hideModal, Content }) => {
  return (
    <div className='CharacterManager-modal'>
      <div className='CharacterManager-modal-content'>
        <span className='CharacterManager-modal-close' onClick={hideModal}>
          &times;
        </span>
        <Content />
      </div>
    </div>
  )
}

const AddCharacter = () => {
  const [charName, setCharName] = useState('')
  const [charClass, setCharClass] = useState('Druid')
  const [charLevel, setCharLevel] = useState(1)

  const classes = ['Druid', 'Wizard', 'Sorcerer', 'Cleric', 'Paladin', 'Ranger', 'Ritual Caster', 'Bard', 'Warlock']

  const nameChange = event => {
    event.persist()
    setCharName(event.target.value)
  }

  const classChange = event => {
    event.persist()
    setCharClass(event.target.value)
  }

  const levelChange = event => {
    event.persist()
    setCharLevel(event.target.value)
  }

  // TODO: Add character
  const createCharacter = () => {
    console.log(charName)
    console.log(charClass)
    console.log(charLevel)
  }

  return (
    <div>
      <form className='CharacterManager-modal-form'>
        <label>
          Name: <input onChange={nameChange} type='text' placeholder="Enter your character's name here" required />
        </label>
        <br />
        <label>
          Class:{' '}
          <select onChange={classChange}>
            {classes.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Level: <input onChange={levelChange} type='number' defaultValue={1} min={1} max={20}></input>
        </label>
        <br />
        <button onClick={createCharacter}>Save</button>
      </form>
    </div>
  )
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
      {showModal && <Modal hideModal={() => setShowModal(false)} Content={AddCharacter} />}
    </div>
  )
}

export default CharacterManager
