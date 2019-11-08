import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card.js'
import SpellFilter from '../components/SpellFilter.js'
import './SpellList.css'

const SpellList = () => {
  const [spells, setSpells] = useState([])
  const [filteredSpells, setFilteredSpells] = useState(spells)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await axios('https://api.open5e.com/spells/?format=json&limit=2000')
      // add array of dnd classes
      const allSpells = result.data.results.map(spell => {
        return { ...spell, classes: spell.dnd_class.split(', ') }
      })

      setSpells(allSpells)
      setFilteredSpells(allSpells)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className='Description-text'>
        <div>
          Welcome to <b>Wizard Beard</b>! The most convenient place on this plane to manage your spells!
        </div>
      </div>
      {isLoading ? (
        <div className='Loading-text'>Loading content</div>
      ) : (
        <div>
          <SpellFilter onChange={setFilteredSpells} spells={spells} />
          <div className='Spell-list'>
            {filteredSpells.length ? filteredSpells.map(s => <Card key={s.name} spell={s} />) : <div className='Description-text'>Alas, such a spell has yet to be crafted.</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default SpellList
