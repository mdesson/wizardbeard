import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import SpellList from './views/SpellList.js'
import Account from './views/Account'
import './App.css'
import firebaseConfig from './firebaseConfig.js'

//// FIREBASE STUFF ////
firebase.initializeApp(firebaseConfig)

// Google OAuth
var provider = new firebase.auth.GoogleAuthProvider()
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
provider.addScope('profile')
provider.addScope('email')

// set language for OAuth
firebase.auth().languageCode = 'en'
firebase.auth().useDeviceLanguage()

var signIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken
      // The signed-in user info.
      var user = result.user
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
    })
}

var signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    })
}

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
            <Account signInFunc={signIn} signOutFunc={signOut} />
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
