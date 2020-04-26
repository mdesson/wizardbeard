import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import marked from 'marked'
import _ from 'lodash'
import './Card.css'
import { updateAllCharacters } from '../redux/actions'
import firebase, { db } from '../firebaseConfig'

const Card = ({ spell }) => {
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [spellStatus, setSpellStatus] = useState('add')
  const characters = useSelector(state => state.characters)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const shortDesc =
    spell.desc.split('.')[0] + '.' + spell.desc.split('.')[1] + '.'
  const fullDesc = marked(spell.desc)

  const showHideDesc = () => setShowFullDesc(!showFullDesc)

  // useEffect hook to update UI with spell's status on current character
  useEffect(() => {
    if (characters) {
      let character = characters.find(char => char.selected)
      if (!character.spells) setSpellStatus('add')
      else if (character.spells.known.includes(spell.name))
        setSpellStatus('known')
      else if (character.spells.prepared.includes(spell.name))
        setSpellStatus('prepared')
      else setSpellStatus('add')
    }
  }, [characters, spell.name])

  const toggleSpell = async () => {
    let updatedChar = characters.find(char => char.selected)
    let oldChar = _.cloneDeep(updatedChar)
    delete oldChar.selected

    // if character has no spells
    if (!updatedChar.spells) {
      // set up spell hierarchy, add spell
      updatedChar = {
        ...updatedChar,
        spells: { known: [spell.name], prepared: [] }
      }
    }
    // if spell known: add to prepared, remove from known
    else if (updatedChar.spells.known.includes(spell.name)) {
      updatedChar.spells.prepared = [...updatedChar.spells.prepared, spell.name]
      updatedChar.spells.known = updatedChar.spells.known.filter(
        spellName => spellName !== spell.name
      )
    }
    // if spell prepared: unlearn it
    else if (updatedChar.spells.prepared.includes(spell.name)) {
      updatedChar.spells.prepared = updatedChar.spells.prepared.filter(
        spellName => spellName !== spell.name
      )
    }
    // spell is unknown, learn it
    else {
      updatedChar.spells.known = [...updatedChar.spells.known, spell.name]
    }

    // dispatch to store
    dispatch(
      updateAllCharacters(
        characters.map(char =>
          char.name === updatedChar.name ? updatedChar : char
        )
      )
    )

    const userDoc = db.collection('users').doc(user.uid)

    // remove from firestore
    await userDoc.update({
      characters: firebase.firestore.FieldValue.arrayRemove(oldChar)
    })

    // add to firestore
    await userDoc.update({
      characters: firebase.firestore.FieldValue.arrayUnion({
        ...oldChar,
        spells: updatedChar.spells
      })
    })
  }

  return (
    <div className="Card-container">
      <div>
        <div className="Card-title">
          <span title={spell.school}>
            {schoolEmojis[spell.school]} {spell.name}
          </span>
        </div>
        <div className="Card-stats">
          <div className="Card-level">{printLevel(spell.level_int)}</div>
          <div className="Card-cast-time">{spell.casting_time}</div>
          <div className="Card-duration">{spell.duration}</div>
          <div className="Card-range">{spell.range}</div>
          {spell.concentration === 'yes' && (
            <div className="Card-concentration">Concentration</div>
          )}
          {spell.ritual === 'yes' && (
            <div className="Card-concentration">Ritual</div>
          )}
        </div>
        <div
          className="Card-description"
          dangerouslySetInnerHTML={{
            __html: showFullDesc ? fullDesc : shortDesc
          }}
        />
        {showFullDesc && spell.higher_level !== '' && (
          <div className="Card-higher-level">{spell.higher_level}</div>
        )}
      </div>
      <div>
        <div className="Card-footer">
          <div className="Card-class">{spell.dnd_class}</div>
          <div className="Card-spell-status">
            {characters && (
              <span onClick={toggleSpell}>{status[spellStatus]}</span>
            )}
          </div>
        </div>
        <div className="Show-hide" onClick={showHideDesc}>
          {showFullDesc ? 'Show less' : 'Show more'}
        </div>
      </div>
    </div>
  )
}

const schoolEmojis = {
  Abjuration: '🛡️ ', // shield
  Conjuration: '🦄 ', // unicorn
  Divination: '🔮 ', // crystal ball
  Enchantment: '✨ ', // sparkles
  Evocation: '💥 ', // explosion
  Illusion: '🌫️ ', // fog
  Necromancy: '💀 ', // skull
  Transmutation: '🎭 ' // performing arts
}

const printLevel = level => {
  if (level === 0) return 'Cantrip'
  if (level === 1) return '1st level'
  if (level === 2) return '2nd level'
  if (level === 3) return '3rd level'
  else return level + 'th level'
}

const status = { prepared: '📖', known: '📕', add: '➕' }

export default Card
