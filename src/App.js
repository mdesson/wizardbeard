import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { auth, provider } from './firebaseConfig'
import SpellList from './views/SpellList.js'
import Account from './views/Account'
import './App.css'

// TODO: Pages are Spell List, My Spellbook, Account

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <span className='Wizard-header' role='img' aria-label='wizard'>
          🧙
        </span>
        <span className='Title-header'>Wizard Beard</span>
      </header>
      <Router>
        {/* Router Links */}
        <div className='App-menu'>
          <Link className='App-menu-item' to='/'>
            Spell List
          </Link>
          <Link className='App-menu-item' to='/account'>
            Account
          </Link>
        </div>

        <div className='Underline'></div>

        {/* Content and Router Swtich */}
        <Switch>
          <Route path='/account'>
            <Account auth={auth} provider={provider} />
          </Route>
          <Route path='/'>
            <SpellList />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
