import { LOAD_ALL_SPELLS, SET_SPELL_FILTER, LOGIN, LOGOUT } from './actionTypes'

export const loadAllSpells = content => ({
  type: LOAD_ALL_SPELLS,
  payload: content
})

export const setSpellFilter = content => ({
  type: SET_SPELL_FILTER,
  payload: content
})

export const login = content => ({
  type: LOGIN,
  payload: content
})

export const logout = content => ({
  type: LOGOUT
})
