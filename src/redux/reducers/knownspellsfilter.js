import { SET_KNOWN_SPELLS_FILTER } from '../actionTypes'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_KNOWN_SPELLS_FILTER: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
