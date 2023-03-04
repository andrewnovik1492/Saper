import { createSlice } from "@reduxjs/toolkit";
import { generateTable, isCellBorderBomb } from "../../helpers/table";

const configurationSlice = createSlice({
  name: 'configuration',
  initialState: {
    status: 'progress',
    cellsList: []
  },
  reducers: {
    changeGameStatus: (state, status) => {
      state.status = status
    },
    startGame: (state) => {
      state.status = 'progress'
      state.cellsList = generateTable()
    },
    changeCellStatus: (state, {payload}) => {
      state.cellsList[payload.row][payload.column] = {
        ...state.cellsList[payload.row][payload.column],
        status: payload.status === 'default' ? 'flag' : payload.status === 'flag' ? 'question' : 'default'
      }
    },
    openCell(state, {payload}) {
      if(state.cellsList[payload.row][payload.column].isBomb) {
        state.cellsList[payload.row][payload.column].isFinished = true
        state.cellsList.forEach(row => {
          row.forEach(cell => {
            if(cell.isBomb) {
              cell.isOpen = true
              state.status = 'lose'
            }
          })
        })
      } else {
        state.cellsList[payload.row][payload.column].isOpen = true
        if(!state.cellsList[payload.row][payload.column].number) {
          const openColumn = (row, column) => {
            let currentRow = row
            while(currentRow >= 0) {
              const currentCell = state.cellsList[currentRow][column]
              currentCell.isOpen = true
              if(isCellBorderBomb(currentCell, state.cellsList)) {
                break;
              }
              currentRow--
            }
            currentRow = row
            while(currentRow <= 15) {
              const currentCell = state.cellsList[currentRow][column]
              currentCell.isOpen = true
              if(isCellBorderBomb(currentCell, state.cellsList)) {
                break;
              }
              currentRow++
            }
          }
          let currentColumn = payload.column
          while(currentColumn <= 15) {
            openColumn(payload.row, currentColumn)
            if(state.cellsList[payload.row][currentColumn].number) {
              break
            }
            currentColumn++
          }
          // currentColumn = payload.column
          // while(currentColumn >= 0) {
          //   openColumn(payload.row, currentColumn)
          //   if(state.cellsList[payload.row][currentColumn].number) {
          //     break
          //   }
          //   currentColumn--
          // }
        }
      }
    }
  }
})

export default configurationSlice.reducer

export const {changeCellStatus, openCell, changeGameStatus, startGame} = configurationSlice.actions


// const checkSquareToBottom = (row, column) => {
//   if(column < 15) {
//     const rightCell = state.cellsList[row][column + 1]
//     rightCell.isOpen = true
//     if(!rightCell.number) {
//       checkSquareToBottom(row, column + 1)
//     }
//   }
//   if(column < 15 && row < 15) {
//     const bottomRigthCell = state.cellsList[row + 1][column + 1]
//     bottomRigthCell.isOpen = true
//     if(!bottomRigthCell.number) {
//       checkSquareToBottom(row + 1, column + 1)
//     }
//   }
//   if(row < 15) {
//     const bottomCell = state.cellsList[row + 1][column]
//     bottomCell.isOpen = true
//     if(!bottomCell.number) {
//       checkSquareToBottom(row + 1, column)
//     }
//   }
//   if(row < 15 && column > 0) {
//     const bottomLeftCell = state.cellsList[row + 1][column - 1]
//     bottomLeftCell.isOpen = true
//     if(!bottomLeftCell.number) {
//       checkSquareToBottom(row + 1, column - 1)
//     }
//   }
//   if(column > 0) {
//     const leftCell = state.cellsList[row][column - 1]
//     if(leftCell.isOpen) return 
//     leftCell.isOpen = true
//     if(!leftCell.number) {
//       checkSquareToBottom(row, column - 1)
//     }
//   }
// }

// const checkSquareToTop = (row, column) => {
//   console.log(row, column, 'square')
//   if(row > 0 && column > 0) {
//     const topLeftCell = state.cellsList[row - 1][column - 1]
//     if(topLeftCell.isOpen) return
//     console.log(topLeftCell.number, 'topleft')
//     topLeftCell.isOpen = true
//     if(!topLeftCell.number) {
//       checkSquareToTop(row - 1, column - 1)
//     }
//   }
//   if(row > 0) {
//     const topCell = state.cellsList[row - 1][column]
//     console.log(topCell.number, 'top')
//     topCell.isOpen = true
//     if(!topCell.number) {
//       checkSquareToTop(row - 1, column)
//     }
//   }
//   if(row > 0 && column < 15) {
//     const topRightCell = state.cellsList[row - 1][column + 1]
//     if(topRightCell.isOpen) return
//     topRightCell.isOpen = true
//     if(!topRightCell.number) {
//       checkSquareToTop(row - 1, column + 1)
//     }
//   }
//   if(column < 15) {
//     const rightCell = state.cellsList[row][column + 1]
//     console.log(rightCell.number, 'right')
//     rightCell.isOpen = true
//     if(!rightCell.number) {
//       checkSquareToTop(row, column + 1)
//     }
//   }
//   if(column > 0) {
//     const leftCell = state.cellsList[row][column - 1]
//     if(leftCell.isOpen) return 
//     leftCell.isOpen = true
//     if(!leftCell.number) {
//       checkSquareToTop(row, column - 1)
//     }
//   }
// }
// checkSquareToBottom(payload.row, payload.column)
// checkSquareToTop(payload.row, payload.column)
