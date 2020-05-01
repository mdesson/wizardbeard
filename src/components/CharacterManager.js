import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import {
  createCharacter,
  updateCharacter,
  deleteCharacter,
  updateAllCharacters,
  loadPreparedSpells,
  loadKnownSpells,
  setFilteredPreparedSpells,
  setFilteredKnownSpells,
  setPreparedSpellsFilter,
  setKnownSpellsFilter
} from '../redux/actions'
import firebase, { db } from '../firebaseConfig'
import './CharacterManager.css'

const CharacterRows = ({ characterArray }) => {
  const characters = useSelector(state => state.characters)
  const spells = useSelector(state => state.allspells)
  const dispatch = useDispatch()

  useEffect(() => {
    let selected = characters.filter(char => char.selected)
    // ensure at least one character is selected after deletion
    // check is put here since useSelector doesn't update until confirmDelete finishes running
    if (characters.length !== 0 && selected.length === 0) {
      // Set the first character in array as selected
      let allCharacters = _.cloneDeep(characters)
      allCharacters[0].selected = true
      dispatch(updateAllCharacters(allCharacters))

      // clear spell filters for known and prepared spells
      dispatch(setPreparedSpellsFilter([]))
      dispatch(setKnownSpellsFilter([]))

      // Update known and prepared spells
      let character = characters[0]

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
    }
  }, [characters, dispatch, spells])
  return characterArray.map(character => (
    <CharacterRow key={character.name} character={character} />
  ))
}

const CharacterRow = ({ character }) => {
  // State
  const [modifyMode, setModifyMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [charName, setCharName] = useState(character.name)
  const [charClass, setCharClass] = useState(character.class)
  const [charLevel, setCharLevel] = useState(character.level)

  // Data
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const classes = [
    'Druid',
    'Wizard',
    'Sorcerer',
    'Cleric',
    'Paladin',
    'Ranger',
    'Ritual Caster',
    'Bard',
    'Warlock'
  ]

  const toggleModify = () => setModifyMode(!modifyMode)
  const toggleDelete = () => setDeleteMode(!deleteMode)

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

  const saveChanges = async () => {
    // new character
    const updatedChar = {
      ...character,
      name: charName,
      class: charClass,
      level: charLevel
    }

    // update store
    dispatch(updateCharacter({ newChar: updatedChar, oldChar: character }))

    // user's document on firestore
    const userDoc = db.collection('users').doc(user.uid)

    // remove from firestore
    let temp = _.cloneDeep(character)
    delete temp.selected
    await userDoc.update({
      characters: firebase.firestore.FieldValue.arrayRemove(temp)
    })

    // add to firestore
    temp = _.cloneDeep(updatedChar)
    await userDoc.update({
      characters: firebase.firestore.FieldValue.arrayUnion(temp)
    })

    // end modify mode
    setModifyMode(false)
  }

  const confirmDelete = async () => {
    // remove from store
    dispatch(deleteCharacter(character))

    // user's document on firestore
    const userDoc = db.collection('users').doc(user.uid)

    // remove from firestore
    let temp = _.cloneDeep(character)
    delete temp.selected
    await userDoc.update({
      characters: firebase.firestore.FieldValue.arrayRemove(temp)
    })

    setDeleteMode(false)
  }

  return (
    <tr key={character.name}>
      <td>
        {modifyMode ? (
          <input
            className="CharacterManager-table-input-text"
            type="text"
            defaultValue={character.name}
            onChange={nameChange}
          />
        ) : (
          character.name
        )}
      </td>
      <td>
        {modifyMode ? (
          <select defaultValue={character.class} onChange={classChange}>
            {classes.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        ) : (
          character.class
        )}
      </td>
      <td>
        {modifyMode ? (
          <input
            className="CharacterManager-table-input-number"
            type="number"
            defaultValue={character.level}
            min={1}
            max={20}
            onChange={levelChange}
          ></input>
        ) : (
          character.level
        )}
      </td>
      {!deleteMode ? (
        <td
          className="Account-button"
          onClick={modifyMode ? saveChanges : toggleModify}
        >
          {modifyMode ? 'Save' : 'Modify'}
        </td>
      ) : (
        <td> </td>
      )}
      {!modifyMode ? (
        <td className="Account-button">
          {deleteMode ? (
            <span>
              <span onClick={confirmDelete}>Confirm</span> /{' '}
              <span onClick={toggleDelete}>Cancel</span>
            </span>
          ) : (
            <span onClick={toggleDelete}>Delete</span>
          )}
        </td>
      ) : (
        <td> </td>
      )}
    </tr>
  )
}

const Modal = ({ hideModal, Content }) => {
  return (
    <div className="CharacterManager-modal">
      <div className="CharacterManager-modal-content">
        <span className="CharacterManager-modal-close" onClick={hideModal}>
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
  const characterNames = useSelector(state => state.characters).map(
    char => char.name
  )
  const dispatch = useDispatch()

  const classes = [
    'Druid',
    'Wizard',
    'Sorcerer',
    'Cleric',
    'Paladin',
    'Ranger',
    'Ritual Caster',
    'Bard',
    'Warlock'
  ]

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

  const saveCharacter = async () => {
    const newChar = {
      name: charName,
      class: charClass,
      level: charLevel,
      spells: { known: [], prepared: [] }
    }
    await dispatch(createCharacter(newChar))

    const userDoc = db.collection('users').doc(user.uid)
    userDoc.update({
      characters: firebase.firestore.FieldValue.arrayUnion(newChar)
    })
    hideModal()
  }

  return (
    <div>
      <form
        onSubmit={e => e.preventDefault()}
        className="CharacterManager-modal-form"
      >
        <h2>Create a New Character</h2>
        <label>
          Name: <input onChange={nameChange} type="text" />
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
          Level:{' '}
          <input onChange={levelChange} type="number" defaultValue={1}></input>
        </label>
        <button
          onClick={saveCharacter}
          disabled={
            characterNames.includes(charName) ||
            charName.length === 0 ||
            charLevel < 1 ||
            charLevel > 20
          }
        >
          Save
        </button>
        {characterNames.includes(charName) && (
          <div className="CharacterManager-form-invalid">
            Character name must be unique
          </div>
        )}
        {charName.length === 0 && (
          <div className="CharacterManager-form-invalid">
            Character must have a name
          </div>
        )}
        {(charLevel < 1 || charLevel > 20) && (
          <div className="CharacterManager-form-invalid">
            Level must be between 1 and 20
          </div>
        )}
      </form>
    </div>
  )
}

const CharacterManager = () => {
  const [showModal, setShowModal] = useState(false)
  const characters = useSelector(state => state.characters)

  return (
    <div className="CharacterManager-container">
      {characters.length === 0 ? (
        <div className="CharacterManager-message">
          You haven't created any characters. Use the button below to get
          started!
        </div>
      ) : (
        <table className="CharacterManager-table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Level</th>
              <th> </th>
              <th> </th>
            </tr>
            {characters.length !== 0 && (
              <CharacterRows characterArray={characters} />
            )}
          </tbody>
        </table>
      )}

      <div className="Account-button" onClick={() => setShowModal(true)}>
        Add New
      </div>
      {showModal && (
        <Modal hideModal={() => setShowModal(false)} Content={AddCharacter} />
      )}
    </div>
  )
}

export default CharacterManager
