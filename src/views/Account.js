import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN, LOGOUT } from '../redux/actionTypes'

// TODO: For data access, https://firebase.google.com/docs/firestore/security/overview
// Better link: https://firebase.google.com/docs/firestore/security/rules-conditions
// Set up firestore: https://firebase.google.com/docs/firestore/quickstart
// example:
// db.collection('users')
//   .doc(firebase.auth().currentUser.uid)
//   .set({ name: 'mike' })

const Account = ({ auth, provider }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const signIn = async () => {
    await auth.signInWithPopup(provider).catch(function(error) {
      console.error('ERROR ON SIGNIN:' + error)
    })
    const user = auth.currentUser
    dispatch({ type: LOGIN, payload: { name: user.displayName, uid: user.uid } })
  }

  var signOut = async () => {
    await auth.signOut().catch(function(error) {
      console.error('ERROR ON SIGNOUT:' + error)
    })
    dispatch({ type: LOGOUT })
  }
  return (
    <div>
      <div onClick={signIn}>Login</div>
      <div onClick={signOut}>Logout</div>
      <div>Hi, {user ? user.name : 'stranger'}.</div>
    </div>
  )
}

export default Account
