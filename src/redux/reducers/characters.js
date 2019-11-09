import { FETCH_CHARACTERS } from '../actionTypes'

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHARACTERS: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
