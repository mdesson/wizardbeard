import React from 'react'
import {
  login,
  logout,
  fetchCharacters,
  clearCharacters
} from '../redux/actions'
import { auth, provider, db } from '../firebaseConfig'
import { useSelector, useDispatch } from 'react-redux'
import './AccountGreeting.css'

const AccountGreeting = ({ loggingIn, setLoggingIn }) => {
  const user = useSelector(state => state.user)
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
    dispatch(login({ name: loggedinUser.displayName, uid: loggedinUser.uid }))

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
            let characters = doc.get('characters')
            characters[0] = { ...characters[0], selected: true }
            dispatch(fetchCharacters(characters))
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

export default AccountGreeting
