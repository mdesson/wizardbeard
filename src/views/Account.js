import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN, LOGOUT } from '../redux/actionTypes'
import './Account.css'

// TODO: For data access, https://firebase.google.com/docs/firestore/security/overview
// Better link: https://firebase.google.com/docs/firestore/security/rules-conditions
// Set up firestore: https://firebase.google.com/docs/firestore/quickstart
// example:
// db.collection('users')
//   .doc(firebase.auth().currentUser.uid)
//   .set({ name: 'mike' })

const Account = ({ auth, provider }) => {
  const [loggingIn, setLoggingIn] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const signIn = async () => {
    setLoggingIn(true)

    await auth.signInWithPopup(provider).catch(function(error) {
      console.error('ERROR ON SIGNIN:' + error)
    })

    const loggedinUser = auth.currentUser
    dispatch({ type: LOGIN, payload: { name: loggedinUser.displayName, uid: loggedinUser.uid } })

    setLoggingIn(false)
  }

  const signOut = async () => {
    await auth.signOut().catch(function(error) {
      console.error('ERROR ON SIGNOUT:' + error)
    })
    dispatch({ type: LOGOUT })
  }

  return (
    <div className='Account-container'>
      <div className='Account-greeting'>
        {loggingIn && <div>Logging In...</div>}
        {user && !loggingIn && (
          <div>
            Welcome, {user.name}{' '}
            <span className='Account-sign-in-out' onClick={signOut}>
              (Sign Out)
            </span>
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
          <li>Change their class(es)</li>
          <li>Set their level</li>
          <li>Delete characters</li>
        </ul>
      </div>
      <div></div>
    </div>
  )
}

export default Account
