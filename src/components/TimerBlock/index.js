import styled from 'styled-components'
const TimerBlock = ({number}) => {
  
  return (
    <TimerWrapper>{number ? `0${number}` : '000'}</TimerWrapper>
  )
}

const TimerWrapper = styled.div`
  background-color: black;
  font-size: 2rem;
  color: red;
`

export default TimerBlock
