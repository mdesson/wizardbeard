import { combineReducers } from 'redux'
import allspells from './allspells'
import preparedspells from './preparedspells'
import knownspells from './knownspells'
import allspellsfilter from './allspellsfilter'
import preparedspellsfilter from './preparedspellsfilter'
import knownspellsfilter from './knownspellsfilter'
import filteredallspells from './filteredallspells'
import filteredpreparedspells from './filteredpreparedspells'
import filteredknownspells from './filteredknownspells'
import user from './user'
import characters from './characters'

export default combineReducers({
  allspells,
  preparedspells,
  knownspells,
  allspellsfilter,
  preparedspellsfilter,
  knownspellsfilter,
  filteredallspells,
  filteredpreparedspells,
  filteredknownspells,
  user,
  characters
})
