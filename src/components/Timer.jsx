import React from 'react'
import { useEffect, useState } from 'react'

function Timer() {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [intervalId, setIntervalId] = useState(null);
    const [intervalIdMinute, setIntervalIdMinute] = useState(null);
  
    function handleStartTimer() {
        setTimeout(()=>{setMinutes(prev => prev-1)}, 1000);

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

      function handleWorkTime(){
        stopTimer(); 
        setMinutes(25); 
        setSeconds(0); 

      }

      function handleShortBreak(){
        stopTimer(); 
        setMinutes(5); 
        setSeconds(0);

      }

      function handleLongBreak(){
        stopTimer(); 
        setMinutes(10); 
        setSeconds(0);
       
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
            stopTimer()
            
            
        }
      }, [seconds]);
  return (
    <div>
        <h4>pomodoro</h4>
        <button onClick={handleWorkTime}>Work Time!</button>
        <button onClick={handleShortBreak}>Short Break</button>
        <button onClick={handleLongBreak}>Long Break</button>

        <div className="timer">

          <h1>{minutes < 0 ? 
          (<>
          <h1>Pomodoro Ended!</h1>
          <p>Choose <b>Work Time</b> for more 25 minutes</p>
          <b>or <i>take a break!</i></b>
          </>
          )
          : (<h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>)}
          </h1>
            

          <button onClick={handleStartTimer}>Start</button>
          <button onClick={stopTimer}>Pause</button>
        </div>
      </div>
  )
}

export default Timer