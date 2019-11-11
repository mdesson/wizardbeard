import { FETCH_CHARACTERS, CREATE_CHARACTER, UPDATE_CHARACTER, DELETE_CHARACTER, CLEAR_CHARACTERS } from '../actionTypes'

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHARACTERS: {
      return action.payload
    }
    case CREATE_CHARACTER: {
      return [...state, action.payload]
    }
    case UPDATE_CHARACTER: {
      return [...state.filter(character => action.remove.name !== character.name), action.payload]
    }
    case DELETE_CHARACTER: {
      return [...state.filter(character => action.payload.name !== character.name)]
    }
    case CLEAR_CHARACTERS: {
      return false
    }
    default: {
      return state
    }
  }
}
