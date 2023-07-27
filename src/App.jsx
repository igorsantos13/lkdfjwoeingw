import { useEffect, useState } from 'react'
import './App.css'


function App() {
  //for todos
  const [task, setTask] = useState('')
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
    
   }
  }, []);

  const handleClick = (event) => {
    event.preventDefault()
    
    if(task === ''){
        return ''
      }else{
        
        setLocalTasks(previousTask => {
          const allTasks = [...previousTask, {task: task, completed: false}]
          const stringifiedTasks = JSON.stringify(allTasks)
          localStorage.setItem('task', stringifiedTasks);

          const savedTasks = localStorage.getItem('task')

          if(savedTasks){
            try{
              const parsedTasks = JSON.parse(savedTasks)
              setLocalTasks(parsedTasks)
            }catch(err){
              console.log('Erro ao analisar os dados do localStorage', err)
            }
            
          }
          
          return allTasks

        } )
        
        }
        setTask('')
        
      }

  //revisar esse trecho para estudos
  const deletTask = (event, index) => {
    // Evita o comportamento de atualizar a página
    event.preventDefault()

    // Recupera os dados do localStorage
    const savedTasks = JSON.parse(localStorage.getItem('task'));

    if (savedTasks && index >= 0 && index < savedTasks.length) {
      // Remover o item do array pelo índice
      savedTasks.splice(index, 1);
  
      // Salvar o array atualizado de volta no localStorage
      localStorage.setItem('task', JSON.stringify(savedTasks));
  
      // Atualizar o estado local com o array atualizado
      setLocalTasks(savedTasks);
    }


  }

  const completedTask = (event, index) => {
    event.preventDefault();

  const savedTasks = JSON.parse(localStorage.getItem('task'));

  // Crie uma cópia do array de tarefas
  const updatedTasks = [...savedTasks];

  // Atualize a propriedade "completed" no objeto desejado
  updatedTasks[index].completed = !updatedTasks[index].completed;

  // Salve o array de tarefas atualizado no localStorage
  localStorage.setItem('task', JSON.stringify(updatedTasks));

  // Atualize o estado local com o array de tarefas atualizado
  setLocalTasks(updatedTasks);

            
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
  
  //USE EFFECTS
  useEffect(() => {
    if (seconds < 0) {
      setSeconds(59); 
    }
    if(minutes < 0){
      setMinutes(24)
    }
  }, [seconds]);
  
  console.log(localTasks)
  return (
    <>

    <div>
      <h1>TODO</h1>
      <form action="">
        <input type="text" onChange={(e)=>setTask(e.target.value)} value={task}/>
        <button onClick={(event)=>handleClick(event)}>add task</button>

        <ul>
        {localTasks?.map((item, index) => (
          <div >
              <li
              key={index}>{item.completed ? `${item.task} TASK COMPLETED!` : item.task}</li>

              <button key={index} onClick={(event)=>deletTask(event, index)}>X</button>
              <button key={index} onClick={(event)=>completedTask(event, index)}>{item.completed ? 'Undo' : 'Mark as completed'}</button>
              
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
