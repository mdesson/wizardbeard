import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Card from '../components/Card.js'
import SpellFilter from '../components/SpellFilter.js'
import './SpellList.css'
import { LOAD_ALL_SPELLS, SET_FILTERED_SPELLS } from '../redux/actionTypes'

// TODO: Add filtering and card support for class
const SpellList = () => {
  const spells = useSelector(state => state.allspells)
  const filteredSpells = useSelector(state => state.filteredspells)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const result = await axios('https://api.open5e.com/spells/?format=json&limit=2000')

      // add array of dnd classes
      const allSpells = result.data.results.map(spell => {
        return { ...spell, classes: spell.dnd_class.split(', ') }
      })

      dispatch({ type: LOAD_ALL_SPELLS, payload: allSpells })
      dispatch({ type: SET_FILTERED_SPELLS, payload: allSpells })

      setIsLoading(false)
    }
    if (spells.length === 0) {
      fetchData()
    }
    // eslint-disable-next-line
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
          <SpellFilter spells={spells} />
          <div className='Spell-list'>
            {filteredSpells.length ? filteredSpells.map(s => <Card key={s.name} spell={s} />) : <div className='Description-text'>Alas, such a spell has yet to be crafted.</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default SpellList
