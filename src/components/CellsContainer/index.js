import { useSelector } from "react-redux"
import CellsRow from "../CellsRow"

const CellsContainer = () => {
  const cellsList = useSelector(state => state.configuration.cellsList)

  return (
    <div className="cells-container">
      {
        cellsList.map((row, index) => <CellsRow row={row} key={index}/>)
      }
    </div>
  )
}

export default CellsContainer

