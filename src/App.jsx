import { useState } from 'react'
import './App.css'

function App() {
  

  return (
    <>
      <div>
        <h4>pomodoro</h4>

        <div className="timer">
          <h1>00:00:00</h1>

          <button>start</button>
          <button>reset</button>
        </div>
      </div>
    </>
  )
}

export default App
