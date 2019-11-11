import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CREATE_CHARACTER } from '../redux/actionTypes'
import firebase, { db } from '../firebaseConfig'
import './CharacterManager.css'

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
        <Content hideModal={hideModal} />
      </div>
    </div>
  )
}

const AddCharacter = ({ hideModal }) => {
  const [charName, setCharName] = useState('')
  const [charClass, setCharClass] = useState('Druid')
  const [charLevel, setCharLevel] = useState(1)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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

  const createCharacter = async () => {
    const newChar = { name: charName, class: charClass, level: charLevel }
    await dispatch({ type: CREATE_CHARACTER, payload: newChar })

    const userDoc = db.collection('users').doc(user.uid)
    userDoc.update({ characters: firebase.firestore.FieldValue.arrayUnion(newChar) })
    hideModal()
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} className='CharacterManager-modal-form'>
        <h2>Create a New Character</h2>
        <label>
          Name: <input onChange={nameChange} type='text' required />
        </label>
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
        <label>
          Level: <input onChange={levelChange} type='number' defaultValue={1} min={1} max={20}></input>
        </label>
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
            <th onClick={() => console.log(characters)}>Name</th>
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
