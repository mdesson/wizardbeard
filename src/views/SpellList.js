import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import CharacterSelect from '../components/CharacterSelect'
import './SpellList.css'
import {
  loadAllSpells,
  setFilteredAllSpells,
  setAllSpellsFilter
} from '../redux/actions'
import SpellGroup from '../components/SpellGroup.js'

// TODO: Add filtering and card support for class
const SpellList = () => {
  const spells = useSelector(state => state.allspells)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const result = await axios(
        'https://api.open5e.com/spells/?format=json&limit=2000'
      )

      // add array of dnd classes
      const allSpells = result.data.results.map(spell => {
        return { ...spell, classes: spell.dnd_class.split(', ') }
      })

      dispatch(loadAllSpells(allSpells))
      dispatch(setFilteredAllSpells(allSpells))

      setIsLoading(false)
    }
    if (spells.length === 0) {
      fetchData()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {user && <CharacterSelect />}
      <div className="Description-text">
        <div>
          Welcome to <b>Wizard Beard</b>! The most convenient place on this
          plane to manage your spells!
        </div>
        {user && (
          <div>
            To learn a spell, click the <b>+</b> on the right side of the spell
            card.
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="Loading-text">Loading content</div>
      ) : (
        <div>
          <SpellGroup
            addMode={true}
            isSearchable={true}
            spellStore="allspells"
            filteredSpellStore="filteredallspells"
            filterName="allspellsfilter"
            setSpellsFunc={setFilteredAllSpells}
            setFilterFunc={setAllSpellsFilter}
            noSpellsFoundString="Alas, such a spell has yet to be crafted"
          />
        </div>
      )}
    </div>
  )
}

export default SpellList
