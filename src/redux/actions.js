import { LOAD_ALL_SPELLS } from './actionTypes'
import { SET_SPELL_FILTER } from './actionTypes'

export const loadAllSpells = content => ({
  type: LOAD_ALL_SPELLS,
  payload: content
})

export const setSpellFilter = content => ({
  type: SET_SPELL_FILTER,
  payload: content
})
