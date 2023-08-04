import React from 'react'
import { useEffect, useState } from 'react'
import betaImage from '../assets/beta2.png'
import './timer.css'


function Timer() {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [intervalId, setIntervalId] = useState(null);
    const [intervalIdMinute, setIntervalIdMinute] = useState(null);
    const [firstMinuteDecremented, setFirstMinuteDecremented] = useState(false);
  
    function handleStartTimer() {

        if (!intervalId) {
          const id = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
          setIntervalId(id);
        }

        if (!firstMinuteDecremented) {
          // Decrementa um minuto no início, apenas uma vez
          setFirstMinuteDecremented(true);
          setTimeout(()=>{setMinutes(prev => prev-1)}, 1000);
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
        setFirstMinuteDecremented(false);
      }

      function handleShortBreak(){
        stopTimer(); 
        setMinutes(5); 
        setSeconds(0);
        setFirstMinuteDecremented(false);
      }

      function handleLongBreak(){
        stopTimer(); 
        setMinutes(10); 
        setSeconds(0);
        setFirstMinuteDecremented(false);       
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
    <div className='timer-container'>
        <img src={betaImage} alt="This project is in beta."/>
        <h4>Pomodoro</h4>
        <div className='buttons'>
        <button onClick={handleWorkTime}>Work Time!</button>
        <button onClick={handleShortBreak}>Short Break</button>
        <button onClick={handleLongBreak}>Long Break</button>

        </div>

        <div className="timer">

          <div className='timer-labels'>{minutes < 0 ? 
          (<>
          <h1>Pomodoro Ended!</h1>
          <p>Choose <b>Work Time</b> for more 25 minutes</p>
          <b>or <i>take a break!</i></b>
          </>
          )
          : (<h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>)}
          </div>
            

            <div className='start-pause-button'>

            <button onClick={handleStartTimer}>Start</button>
            <button onClick={stopTimer}>Pause</button>
            </div>
        </div>
      </div>
  )
}

export default Timer