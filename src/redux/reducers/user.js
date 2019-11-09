import { LOGIN, LOGOUT } from '../actionTypes'

const initialState = false

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return action.payload
    }
    case LOGOUT: {
      return false
    }
    default: {
      return state
    }
  }
}
