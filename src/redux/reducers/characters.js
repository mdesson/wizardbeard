import { FETCH_CHARACTERS, CLEAR_CHARACTERS } from '../actionTypes'

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHARACTERS: {
      return action.payload
    }
    case CLEAR_CHARACTERS: {
      return false
    }
    default: {
      return state
    }
  }
}
