import React from 'react'
import Card from '../components/Card.js'

const SpellList = () => {
  var spell = {
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
  return (
    <div>
      <h1>YES!</h1>
      <Card spell={spell} />
    </div>
  )
}

export default SpellList
