import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import marked from 'marked'
import './Card.css'
import { updateAllCharacters, setFilteredSpells } from '../redux/actions'

// TODO: Rewrite known/unknown management. Putting a lot of state in one small component. It doesn't update when you change characters.

const Card = ({ spell }) => {
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [spellStatus, setSpellStatus] = useState('add')
  const characters = useSelector(state => state.characters)
  const dispatch = useDispatch()

  const shortDesc =
    spell.desc.split('.')[0] + '.' + spell.desc.split('.')[1] + '.'
  const fullDesc = marked(spell.desc)

  const showHideDesc = () => setShowFullDesc(!showFullDesc)

  const toggleSpell = () => {
    // TODO: Set loading
    // TODO: Update firebase

    let character = characters.find(char => char.selected)

    // if character has no spells
    if (!character.spells) {
      // set up spell hierarchy, add spell
      character = {
        ...character,
        spells: { known: [spell.name], prepared: [] }
      }
      // if spell known: add to prepared, remove from known
    } else if (character.spells.known.includes(spell.name)) {
      character.spells.prepared = [...character.spells.prepared, spell.name]
      character.spells.known = character.spells.known.filter(
        spellName => spellName !== spell.name
      )
    }
    // if spell prepared: add to known, remove from prepared
    else if (character.spells.prepared.includes(spell.name)) {
      character.spells.known = [...character.spells.known, spell.name]
      character.spells.prepared = character.spells.prepared.filter(
        spellName => spellName !== spell.name
      )
    }

    // spell is unknown, learn it
    else {
      character.spells.known = [...character.spells.known, spell.name]
    }

    // dispatch to store
    dispatch(
      updateAllCharacters(
        characters.map(char =>
          char.name === character.name ? character : char
        )
      )
    )

    // update UI with new status
    if (spellStatus === 'add') setSpellStatus('known')
    else if (spellStatus === 'known') setSpellStatus('prepared')
    else setSpellStatus('add')
  }

  const unlearnSpell = () => {
    // TODO: Set loading
    // TODO: Update firebase

    let character = characters.find(char => char.selected)

    // remove from known and/or prepared
    character.spells.known = character.spells.known.filter(
      spell => spell !== spell.name
    )
    character.spells.prepared = character.spells.prepared.filter(
      spell => spell !== spell.name
    )

    // update store
    dispatch(
      updateAllCharacters(
        characters.map(char =>
          char.name === character.name ? character : char
        )
      )
    )
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
