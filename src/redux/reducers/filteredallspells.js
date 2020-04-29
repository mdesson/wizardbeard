import { SET_FILTERED_ALL_SPELLS } from '../actionTypes'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERED_ALL_SPELLS: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
