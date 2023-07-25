import { useEffect, useState } from 'react'
import './App.css'


function App() {
  //for todos
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState([]) 
  const [localTasks, setLocalTasks]  = useState([])

  //for pomodoro
  const [minutes, setMinutes] = useState(24)
  const [seconds, setSeconds] = useState(59)
  const [intervalId, setIntervalId] = useState(null);
  const [intervalIdMinute, setIntervalIdMinute] = useState(null);

  useEffect(() => {
    // Recuperando os dados do localStorage ao montar o componente
    const savedTasks = localStorage.getItem('task')

   if(savedTasks){
    try{
      const parsedTasks = JSON.parse(savedTasks)
      setLocalTasks(parsedTasks)
    }catch(err){
      console.log('Erro ao analisar os dados do localStorage', err)
    }
    setLocalTasks(savedTasks)
   }
  }, []);

  const handleClick = (event) => {
    event.preventDefault()
    
    if(task === ''){
        return ''
      }else{
        localStorage.setItem('task', JSON.stringify(task));
        
        setTaskList(previousTask => [...previousTask, {task: task, completed: false}] )
        
        }
        setTask('')
        
      }

      
  const deletTask = (event, taskIndex) => {
    event.preventDefault()

    setTaskList(prev => prev.filter((item, index) => index !==  taskIndex))

  }

  const completedTask = (event, taskIndex) => {
    event.preventDefault()

    //revisar esse trecho para estudos - vlw chatGPT!
    setTaskList(prevTaskList => {
      return prevTaskList.map((item, index) => {
        if(taskIndex == index){
          return {...item, completed: !item.completed}
        }else{
          return item
        }
      })
    })
    
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

  //USE EFFECTS!
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
              <li
              key={index}>{item.completed ? `${item.task} TASK COMPLETED!` : item.task}</li>

              <button key={index} onClick={(event)=>deletTask(event, index)}>X</button>
              <button key={index} onClick={(event)=>completedTask(event, index)}>{item.completed ? 'Undo' : 'Mark as completed'}</button>
              
            </div>
            
          ))}
        </ul>

        <h1>teste</h1>
        <div>
          {/* <ul>
            {localTasks?.map((item, index) => (
              <div>
                <li key={index}>{item.task}</li>
              </div>
            ))}
          </ul> */}
        </div>

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
