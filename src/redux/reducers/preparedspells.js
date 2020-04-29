import { LOAD_PREPARED_SPELLS } from '../actionTypes'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PREPARED_SPELLS: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
