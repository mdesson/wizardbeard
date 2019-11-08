import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SpellList from './views/SpellList.js'
import Character from './views/Character'
import './App.css'

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
          <Link className='App-menu-item' to='/mybook'>
            My Spell Book
          </Link>
        </div>

        <div className='Underline'></div>

        {/* Content and Router Swtich */}
        <Switch>
          <Route path='/mybook'>
            <Character />
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
