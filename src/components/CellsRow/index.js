import Cell from "../Cell"
import './index.scss';

const CellsRow = ({row}) => {
  return (
    <div className="row-block">
      {
        row.map(cell => <Cell cell={cell} key={`${cell.row}-${cell.column}`}/>)
      }
    </div>
  )
}

export default CellsRow
