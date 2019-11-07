import React, { useState } from 'react'
import marked from 'marked'
import './Card.css'

const Card = ({ spell }) => {
  const [showFullDesc, setShowFulLDesc] = useState(false)
  const shortDesc =
    spell.desc.split('.')[0] + '.' + spell.desc.split('.')[1] + '.'
  const fullDesc = marked(spell.desc)

  const showHideDesc = () => setShowFulLDesc(!showFullDesc)

  return (
    <div className="Card-container">
      <div>
        <div className="Card-title">
          <span title={spell.school}>{schoolEmojis[spell.school]}</span>
          <span>{spell.name}</span>
        </div>
        <div className="Card-stats">
          <div className="Card-level">{printLevel(spell.level_int)}</div>
          <div className="Card-cast-time">{spell.casting_time}</div>
          <div className="Card-duration">{spell.duration}</div>
          <div className="Card-range">{spell.range}</div>
          {spell.concentration === 'yes' && (
            <div className="Card-concentration"></div>
          )}
        </div>
        <div
          className="Card-description"
          dangerouslySetInnerHTML={{
            __html: showFullDesc ? fullDesc : shortDesc
          }}
        />
      </div>
      <div className="Show-hide" onClick={showHideDesc}>
        {showFullDesc ? 'Show less' : 'Show more'}
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

export default Card
