import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AccoutGreeting from '../components/LogInManager'
import CharacterManager from '../components/CharacterManager'
import './Account.css'

const Account = () => {
  const [loggingIn, setLoggingIn] = useState(false)
  const user = useSelector(state => state.user)

  return (
    <div className="Account-container">
      <AccoutGreeting loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
      {user && !loggingIn && <CharacterManager />}
    </div>
  )
}

export default Account
