import React from 'react'
import { useSelector } from 'react-redux'
import CharacterSelect from '../components/CharacterSelect'
import PreparedSpells from '../components/PreparedSpells'
import KnownSpells from '../components/KnownSpells'
import './SpellBook.css'

const SpellBook = () => {
  const user = useSelector(state => state.user)
  // Components: CharacterSelect, PreparedSpells, KnownSpells
  return (
    <div className="SpellBook-container">
      {user && <CharacterSelect />}
      {/* <PreparedSpells />
      <KnownSpells /> */}
    </div>
  )
}

export default SpellBook
