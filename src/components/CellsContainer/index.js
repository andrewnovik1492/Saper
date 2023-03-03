import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { generateCellsList } from "../../store/slices/cellsSlice"
import CellsRow from "../CellsRow"

const CellsContainer = () => {
  const cellsList = useSelector(state => state.cells.cellsList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(generateCellsList())
  }, [])

  return (
    <div className="cells-container">
      {
        cellsList.map((row, index) => <CellsRow row={row} key={index}/>)
      }
    </div>
  )
}

export default CellsContainer
