import { SET_ALL_SPELLS_FILTER } from '../actionTypes'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_SPELLS_FILTER: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
