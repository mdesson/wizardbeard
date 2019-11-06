import React from 'react'
import './Card.css'

const Card = ({ spell }) => {
  return (
    <div className="Card-container">
      <div className="Card-title">
        <span title={spell.school}>{schoolEmojis[spell.school]}</span>
        <span>{spell.name}</span>
      </div>
      <div className="Card-stats">
        <div className="Card-level">{prettyLevel(spell.level)}</div>
        <div className="Card-cast-time">{spell.casting_time}</div>
        <div className="Card-duration">{spell.duration}</div>
        <div className="Card-range">{spell.range}</div>
        {spell.concentration === 'yes' && (
          <div className="Card-concentration"></div>
        )}
      </div>
      <div className="Card-description">{spell.description}</div>
    </div>
  )
}

const schoolEmojis = {
  Abjuration: '🛡️', // shield
  Conjuration: '🦄', // unicorn
  Divination: '🔮', // crystal ball
  Enchantment: '✨', // sparkles
  Evocation: '💥', // explosion
  Illusion: '🌫️', // fog
  Necromancy: '💀', // skull
  Transmutation: '🎭' // performing arts
}

const prettyLevel = level => {
  if (level === -1) return 'Cantrip'
  if (level === 1) return '1st level'
  if (level === 2) return '2nd level'
  if (level === 3) return '3rd level'
  else return level + 'th level'
}

export default Card
