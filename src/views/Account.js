import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN, LOGOUT, FETCH_CHARACTERS, CLEAR_CHARACTERS } from '../redux/actionTypes'
import { auth, provider, db } from '../firebaseConfig'
import './Account.css'

const Account = () => {
  const [loggingIn, setLoggingIn] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const signIn = async () => {
    // display loading message
    setLoggingIn(true)

    // open OAuth window for signin
    await auth.signInWithPopup(provider).catch(function(error) {
      console.error('ERROR ON SIGNIN:' + error)
    })

    // Get logged in user's data and put in store
    const loggedinUser = auth.currentUser
    dispatch({ type: LOGIN, payload: { name: loggedinUser.displayName, uid: loggedinUser.uid } })

    // fetch user's record from firestore
    const userDoc = db.collection('users').doc(loggedinUser.uid)

    // fetch user's characters
    userDoc
      .get()
      .then(doc => {
        // if user exists in firestore
        if (doc.exists) {
          // if user already has an account, load characters into store
          if (doc.get('characters')) {
            dispatch({ type: FETCH_CHARACTERS, payload: doc.get('characters') })
          }

          // new user, create empty array of characters, load empty array into store
          else {
            db.collection('users')
              .doc(loggedinUser.uid)
              .set({ characters: [] })

            dispatch({ type: FETCH_CHARACTERS, payload: [] })
          }
        }

        // error, user does not exist
        else {
          console.error('ERROR: No such user, sign in workflow error.')
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
    dispatch({ type: LOGOUT })
    dispatch({ type: CLEAR_CHARACTERS })
  }

  return (
    <div className='Account-container'>
      <div className='Account-greeting'>
        {loggingIn && <div>Logging In...</div>}
        {user && !loggingIn && (
          <div>
            Welcome, {user.name} (
            <span className='Account-sign-in-out' onClick={signOut}>
              Sign Out
            </span>
            )
          </div>
        )}
        {!user && !loggingIn && (
          <div>
            Welcome, stranger.{' '}
            <span className='Account-sign-in-out' onClick={signIn}>
              Sign In or Create Account
            </span>{' '}
            to access this page's features.
          </div>
        )}
      </div>
      <div>Use this page to manage your characters. You can:</div>
      <div>
        <ul>
          <li>Create characters</li>
          <li>Change their class</li>
          <li>Set their level</li>
          <li>Delete characters</li>
        </ul>
      </div>
      <div></div>
    </div>
  )
}

export default Account
