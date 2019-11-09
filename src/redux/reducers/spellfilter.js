import { SET_SPELL_FILTER } from '../actionTypes'

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPELL_FILTER: {
      return action.payload
    }
    default: {
      return state
    }
  }
}