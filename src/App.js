import React from 'react'
import SpellList from './views/SpellList.js'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="Wizard-header" role="img" aria-label="wizard">
          🧙
        </span>
        <span className="Title-header">Wizard Beard</span>
      </header>
      <div className="Underline"></div>
      <SpellList />
    </div>
  )
}

export default App
