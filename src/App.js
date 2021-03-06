import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SpellList from './views/SpellList.js'
import Account from './views/Account'
import SpellBook from './views/SpellBook'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="Wizard-header" role="img" aria-label="wizard">
          🧙
        </span>
        <span className="Title-header">Wizard Beard</span>
      </header>
      <Router>
        {/* Router Links */}
        <div className="App-menu">
          <Link className="App-menu-item" to="/">
            Spell List
          </Link>
          <Link className="App-menu-item" to="/spellbook">
            My Spell Book
          </Link>
          <Link className="App-menu-item" to="/account">
            My Account
          </Link>
        </div>

        <div className="Underline"></div>

        {/* Content and Router Swtich */}
        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/spellbook">
            <SpellBook />
          </Route>
          <Route path="/">
            <SpellList />
          </Route>
        </Switch>
      </Router>
      <footer>
        <a href="https://github.com/mdesson/wizardbeard">
          Contact / Privacy Policy / Project Details
        </a>
      </footer>
    </div>
  )
}

export default App
