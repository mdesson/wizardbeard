import {
  LOAD_ALL_SPELLS,
  LOAD_PREPARED_SPELLS,
  LOAD_KNOWN_SPELLS,
  SET_ALL_SPELLS_FILTER,
  SET_FILTERED_ALL_SPELLS,
  SET_PREPARED_SPELLS_FILTER,
  SET_FILTERED_PREPARED_SPELLS,
  SET_KNOWN_SPELLS_FILTER,
  SET_FILTERED_KNOWN_SPELLS,
  LOGIN,
  LOGOUT,
  FETCH_CHARACTERS,
  CREATE_CHARACTER,
  DELETE_CHARACTER,
  CLEAR_CHARACTERS,
  UPDATE_CHARACTER,
  UPDATE_ALL_CHARACTERS
} from './actionTypes'

export const loadAllSpells = content => ({
  type: LOAD_ALL_SPELLS,
  payload: content
})
export const loadPreparedSpells = content => ({
  type: LOAD_PREPARED_SPELLS,
  payload: content
})
export const loadKnownSpells = content => ({
  type: LOAD_KNOWN_SPELLS,
  payload: content
})

export const setAllSpellsFilter = content => ({
  type: SET_ALL_SPELLS_FILTER,
  payload: content
})

export const setFilteredAllSpells = content => ({
  type: SET_FILTERED_ALL_SPELLS,
  payload: content
})

export const setPreparedSpellsFilter = content => ({
  type: SET_PREPARED_SPELLS_FILTER,
  payload: content
})

export const setFilteredPreparedSpells = content => ({
  type: SET_FILTERED_PREPARED_SPELLS,
  payload: content
})

export const setKnownSpellsFilter = content => ({
  type: SET_KNOWN_SPELLS_FILTER,
  payload: content
})

export const setFilteredKnownSpells = content => ({
  type: SET_FILTERED_KNOWN_SPELLS,
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

export const updateAllCharacters = content => ({
  type: UPDATE_ALL_CHARACTERS,
  payload: content
})

export const updateCharacter = content => ({
  type: UPDATE_CHARACTER,
  payload: content.newChar,
  remove: content.oldChar
})

export const deleteCharacter = content => ({
  type: DELETE_CHARACTER,
  payload: content
})

export const clearCharacters = content => ({
  type: CLEAR_CHARACTERS
})
