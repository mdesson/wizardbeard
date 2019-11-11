import { FETCH_CHARACTERS, CREATE_CHARACTER, CLEAR_CHARACTERS } from '../actionTypes'

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHARACTERS: {
      return action.payload
    }
    case CREATE_CHARACTER: {
      return [...state, action.payload]
    }
    case CLEAR_CHARACTERS: {
      return false
    }
    default: {
      return state
    }
  }
}
