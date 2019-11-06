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

var example = {
  name: 'Acid Arrow',
  school: 'Evocation',
  duration: 'instantaneous',
  ritual: 'no',
  material: 'Powdered rhubarb leaf and an adder’s stomach.',
  components: ['V', 'S', 'M'],
  range: '90 feet',
  concentration: 'no',
  casting_time: '1 action',
  level: 2,
  description:
    'A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.'
}

export default Card
