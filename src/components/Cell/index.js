import { useDispatch } from "react-redux"
import styled from "styled-components"
import { changeCellStatus } from "../../store/slices/cellsSlice"
import {ReactComponent as Flag} from '../../images/svg/flag.svg'
import {ReactComponent as Question} from '../../images/svg/question.svg'
import {ReactComponent as Bomb} from '../../images/svg/bomb.svg'
import { openCell } from "../../store/slices/cellsSlice"

const Cell = ({cell}) => {
  const dispatch = useDispatch()
  const rigthClickHandler = (event) => {
    event.preventDefault()
    dispatch(changeCellStatus(cell))
  }

  const openCellHandler = () => {
    dispatch(openCell(cell))
  }

  return (
    <CellContainer finish={cell.isFinished} open={cell.isOpen && !cell.isBomb} onClick={openCellHandler} onContextMenu={rigthClickHandler}>
      {
        cell.isOpen && cell.isBomb && <Bomb />
      }
      {
        cell.isOpen && !cell.isBomb && <span>{cell.number || ''}</span>
      }
      {
        cell.status === 'flag' ? <Flag/> : cell.status === 'question' ? <Question /> : ''
      }
    </CellContainer>
  )
}

const CellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 1px solid black;
  background-color: ${(props) => props.finish ? 'red': props.open ? 'white' : 'rgb(172, 172, 192)'};
  color: blue;
  font-size: 20px;
`
export default Cell
