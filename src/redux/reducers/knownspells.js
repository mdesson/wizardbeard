import { LOAD_KNOWN_SPELLS } from '../actionTypes'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_KNOWN_SPELLS: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
