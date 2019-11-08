import React from 'react'

// TODO: For data access, https://firebase.google.com/docs/firestore/security/overview
// Better link: https://firebase.google.com/docs/firestore/security/rules-conditions
// Set up firestore: https://firebase.google.com/docs/firestore/quickstart

const Account = ({ signInFunc, signOutFunc }) => {
  return (
    <div>
      <div onClick={signInFunc}>Login</div>
      <div onClick={signOutFunc}>Log Out</div>
      <div>Hi, name</div>
      <div>You like to eat food</div>
    </div>
  )
}

export default Account
