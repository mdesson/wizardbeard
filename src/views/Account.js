import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AccoutGreeting from '../components/AccountGreeting'
import './Account.css'

const Account = () => {
  const [loggingIn, setLoggingIn] = useState(false)
  const user = useSelector(state => state.user)
  const characters = useSelector(state => state.characters)

  return (
    <div className='Account-container'>
      <AccoutGreeting loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
      {user && !loggingIn && (
        <div className='Account-table-container'>
          <table className='Account-table'>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Level</th>
              <th> </th>
            </tr>
            {characters.map(character => (
              <tr>
                <td>{character.name}</td>
                <td>{character.class}</td>
                <td>{character.level}</td>
                <td className='Account-button'>Delete</td>
              </tr>
            ))}
          </table>
          <div className='Account-button'>Add New</div>
        </div>
      )}
    </div>
  )
}

export default Account
