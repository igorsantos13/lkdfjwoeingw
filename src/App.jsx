import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //for todos
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState([])

  //for pomodoro
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(11)
  const [intervalId, setIntervalId] = useState(null);

  const handleClick = (event) => {
    event.preventDefault()
    setTaskList((previousTasks)=> [...previousTasks, task])
    setTask('')
    
  }

  function handleStartTimer() {
    if (!intervalId) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setIntervalId(id);
    }
  }

  function stopTimer(){
    clearInterval(intervalId);
    setIntervalId(null);
  }

  useEffect(() => {
    if (seconds === 0) {
      stopTimer();
    }
  }, [seconds]);
  
  return (
    <>

    <div>
      <h1>TODO</h1>
      <form action="">
        <input type="text" onChange={(e)=>setTask(e.target.value)} value={task}/>
        <button onClick={(event)=>handleClick(event)}>add task</button>

        <ul>
          {taskList?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

      </form>
    </div>

      <div>
        <h4>pomodoro</h4>

        <div className="timer">
          <h1>00:{seconds < 10 ? `0${seconds}`: seconds}</h1>

          <button onClick={handleStartTimer}>start</button>
          <button>reset</button>
        </div>
      </div>
    </>
  )
}

export default App
