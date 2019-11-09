import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import SpellList from './views/SpellList.js'
import Account from './views/Account'
import './App.css'
import firebaseConfig from './firebaseConfig.js'

// TODO: Pages are Spell List, My Spellbook, Adventurers

// const dispatch = useDispatch()

//// FIREBASE STUFF ////
firebase.initializeApp(firebaseConfig)

// firestore
var db = firebase.firestore()

// Google OAuth
var provider = new firebase.auth.GoogleAuthProvider()

// set language for OAuth
firebase.auth().languageCode = 'en'
firebase.auth().useDeviceLanguage()

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
            <Account auth={firebase.auth()} provider={provider} />
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
