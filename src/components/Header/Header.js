import './index.scss';
import TimerBlock from '../TimerBlock';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {ReactComponent as Smile} from '../../images/svg/smile.svg';
import {ReactComponent as Warning} from '../../images/svg/warning.svg';
import {ReactComponent as Lose} from '../../images/svg/lose.svg';

const Header = () => {
  const [minutes, setMinutes] = useState(41)
  const [seconds, setSeconds] = useState(0)
  const status = useSelector(state => state.configuration.status)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev === 60 ? 0 : prev + 1) 
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if(seconds === 0) {
      setMinutes((prev) => prev - 1)
    }
  }, [seconds])

  const clickHandler = () => {
    if(status === 'progress') {
      resetGame()
    }
  }

  const resetGame = () => {
    setMinutes(41)
    setSeconds(0)
  }
  return (
    <header>
      <TimerBlock number={minutes} />
      <button onClick={clickHandler}>
        {
          status === 'progress' ? <Smile /> : status === 'warning' ? <Warning /> : <Lose />
        }
      </button>
      <TimerBlock number={seconds}/>
    </header>
  )
}

export default Header
