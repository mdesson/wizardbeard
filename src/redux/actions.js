import { LOAD_ALL_SPELLS, SET_SPELL_FILTER, SET_FILTERED_SPELLS, LOGIN, LOGOUT, FETCH_CHARACTERS, CREATE_CHARACTER, CLEAR_CHARACTERS } from './actionTypes'

export const loadAllSpells = content => ({
  type: LOAD_ALL_SPELLS,
  payload: content
})

export const setSpellFilter = content => ({
  type: SET_SPELL_FILTER,
  payload: content
})

export const setFilteredSpells = content => ({
  type: SET_FILTERED_SPELLS,
  payload: content
})

export const login = content => ({
  type: LOGIN,
  payload: content
})

export const logout = () => ({
  type: LOGOUT
})

export const fetchCharacters = content => ({
  type: FETCH_CHARACTERS,
  payload: content
})

export const createCharacter = content => ({
  type: CREATE_CHARACTER,
  payload: content
})

export const clearCharacters = content => ({
  type: CLEAR_CHARACTERS
})
