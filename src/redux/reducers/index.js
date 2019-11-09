import { combineReducers } from 'redux'
import allspells from './allspells'
import spellfilter from './spellfilter'
import filteredspells from './filteredspells'
import user from './user'
import characters from './characters'

export default combineReducers({ allspells, spellfilter, filteredspells, user })
