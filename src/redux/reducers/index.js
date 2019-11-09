import { combineReducers } from 'redux'
import allspells from './allspells'
import spellfilter from './spellfilter'
import user from './user'
export default combineReducers({ allspells, spellfilter, user })
