import './index.scss';
import TimerBlock from '../TimerBlock';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ReactComponent as Smile} from '../../images/svg/smile.svg';
import {ReactComponent as Warning} from '../../images/svg/warning.svg';
import {ReactComponent as Lose} from '../../images/svg/lose.svg';
import { changeGameStatus, startGame } from '../../store/slices/configurationSlice';

const Header = () => {
  const dispatch = useDispatch()
  const [minutes, setMinutes] = useState(40)
  const [seconds, setSeconds] = useState(1)
  const [minTimer, setMinTimer] = useState(null)
  const gameStatus = useSelector(state => state.configuration.status)

  const startInterval = () => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev === 60 ? 0 : prev + 1) 
    }, 1000)
    setMinTimer(interval)
    return interval
  }
  useEffect(() => {
    if(gameStatus === 'lose') {
      clearInterval(minTimer)
      resetGame()
    }
  }, [gameStatus])

  useEffect(() => {
    if(!minutes) {
      dispatch(changeGameStatus('lose'))
    }
  }, [minutes])
  useEffect(() => {
    const interval = startInterval()

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if(seconds === 0) {
      setMinutes((prev) => prev - 1)
    }
  }, [seconds])

  const clickHandler = () => {
    dispatch(startGame())
    resetGame()
    startInterval()
  }

  const resetGame = () => {
    setMinutes(40)
    setSeconds(0)
  }
  return (
    <header>
      <TimerBlock number={minutes} />
      <button onClick={clickHandler}>
        {
          gameStatus === 'progress' ? <Smile /> : gameStatus === 'warning' ? <Warning /> : <Lose />
        }
      </button>
      <TimerBlock number={seconds}/>
    </header>
  )
}

export default Header
