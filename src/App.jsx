import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //for todos
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState([])
  const [completed, setCompleted] = useState(false)
  

  //for pomodoro
  const [minutes, setMinutes] = useState(24)
  const [seconds, setSeconds] = useState(59)
  const [intervalId, setIntervalId] = useState(null);
  const [intervalIdMinute, setIntervalIdMinute] = useState(null);

  const handleClick = (event) => {
    event.preventDefault()

    if(task === ''){
      return ''
    }else{
      setTaskList((previousTasks)=> [...previousTasks, task])

    }
    setTask('')
    
  }

  const deletTask = (event, taskIndex) => {
    event.preventDefault()

    setTaskList(prev => prev.filter((item, index) => index !==  taskIndex))

  }

  const completedTask = (event, taskIndex) => {
    event.preventDefault()
    // vairavel setCompleted(true) atualiza para todos
    //mudar taskList para objeto
    //task: 'task', completed: false
    console.log('completed!')
    
  }


//pomodoro
  function handleStartTimer() {
    if (!intervalId) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setIntervalId(id);
    }

    if (!intervalIdMinute) {
      const idMinute = setInterval(() => {
        setMinutes((prevMinutes) => prevMinutes -1)
      }, 60000);
      setIntervalIdMinute(idMinute);
    }
  }

  function stopTimer(){
    clearInterval(intervalId);
    clearInterval(intervalIdMinute);
    setIntervalId(null);
    setIntervalIdMinute(null);
  }

  useEffect(() => {
    if (seconds < 0) {
      setSeconds(59); 
    }
    if(minutes < 0){
      setMinutes(24)
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
            <div >
              {/* ajustar aqui depois do completedTask */}
              <li 
              contentEditable={completed ? false : true} 
              key={index}>{completed ? `${item} TASK COMPLETED!` : item}</li>
              <button key={index} onClick={(event)=>deletTask(event, index)}>X</button>
              <button key={index} onClick={(event)=>completedTask(event, index)}>mark as completed</button>
              
            </div>
            
          ))}
        </ul>

      </form>
    </div>

      <div>
        <h4>pomodoro</h4>

        <div className="timer">
          <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>

          <button onClick={handleStartTimer}>start</button>
          <button onClick={stopTimer}>reset</button>
        </div>
      </div>
    </>
  )
}

export default App
