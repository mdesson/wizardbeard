import React from 'react'
import {
  login,
  logout,
  fetchCharacters,
  clearCharacters,
  loadPreparedSpells,
  loadKnownSpells,
  setPreparedSpellsFilter,
  setKnownSpellsFilter,
  setFilteredKnownSpells,
  setFilteredPreparedSpells
} from '../redux/actions'
import { auth, provider, db } from '../firebaseConfig'
import { useSelector, useDispatch } from 'react-redux'
import './LogInManager.css'

const LogInManager = ({ loggingIn, setLoggingIn }) => {
  const user = useSelector(state => state.user)
  const spells = useSelector(state => state.allspells)
  const dispatch = useDispatch()

  const signIn = async () => {
    // display loading message
    setLoggingIn(true)

    // open OAuth window for signin
    await auth.signInWithPopup(provider).catch(function(error) {
      console.error('ERROR ON SIGNIN:' + error)
    })

    // Get logged in user's data and put in store
    const loggedinUser = auth.currentUser

    // check for login failure
    if (!loggedinUser) {
      setLoggingIn(false)
      return
    }

    dispatch(login({ name: loggedinUser.displayName, uid: loggedinUser.uid }))

    // Declare current character
    let allCharacters = []

    // fetch user's record from firestore
    const userDoc = db.collection('users').doc(loggedinUser.uid)

    // fetch user's characters
    await userDoc
      .get()
      .then(doc => {
        // if user exists in firestore
        if (doc.exists) {
          // if user already has an account, load characters into store
          if (doc.get('characters')) {
            allCharacters = doc.get('characters')
            allCharacters[0] = { ...allCharacters[0], selected: true }
            dispatch(fetchCharacters(allCharacters))
          }
        }

        // new user, create empty array of characters, load empty array into store
        else {
          db.collection('users')
            .doc(loggedinUser.uid)
            .set({ characters: [] })

          dispatch(fetchCharacters([]))
        }
      })
      .catch(error => console.log(error))

    // Update prepared and known spells
    let character = allCharacters.find(char => char.selected)
    if (character && character.spells) {
      let known = character.spells.known.map(knownSpell =>
        spells.find(spell => spell.name === knownSpell)
      )
      let prepared = character.spells.prepared.map(knownSpell =>
        spells.find(spell => spell.name === knownSpell)
      )
      dispatch(loadPreparedSpells(prepared))
      dispatch(loadKnownSpells(known))

      // clear spell filters for known and prepared spells
      dispatch(setPreparedSpellsFilter([]))
      dispatch(setKnownSpellsFilter([]))
      dispatch(setFilteredPreparedSpells(prepared))
      dispatch(setFilteredKnownSpells(known))
    }

    // hide loading message
    setLoggingIn(false)
  }

  const signOut = async () => {
    await auth.signOut().catch(function(error) {
      console.error('ERROR ON SIGNOUT:' + error)
    })
    // clear user data from redux
    dispatch(logout())
    dispatch(clearCharacters())
  }
  return (
    <div className="Account-greeting">
      {loggingIn && <div>Logging In...</div>}
      {user && !loggingIn && (
        <div>
          Welcome, {user.name} (
          <span className="Account-button" onClick={signOut}>
            Sign Out
          </span>
          )
        </div>
      )}
      {!user && !loggingIn && (
        <div>
          Welcome, stranger.{' '}
          <span className="Account-button" onClick={signIn}>
            Sign In or Create Account
          </span>{' '}
          to access this page's features.
        </div>
      )}
    </div>
  )
}

export default LogInManager
