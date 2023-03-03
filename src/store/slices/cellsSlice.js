import { createSlice } from "@reduxjs/toolkit";

const addRandomBomb = (table) => {
  const newTable = [...table]
  
  let bombCount = 0
  while(bombCount < 38) {
    const randomRow = Math.floor(Math.random() * 15 + 1);
    const randowColumn = Math.floor(Math.random() * 15 + 1);
    if(!newTable[randomRow][randowColumn].isBomb) {
      newTable[randomRow][randowColumn].isBomb = true
      bombCount++
    }
  }
  
  return newTable
}

const addTableNumbers = (table) => {
  const newTable = [...table]
  for(let i = 0; i < 16; i++) {
    for(let y = 0; y < 16; y++) {
      if(newTable[i][y].isBomb) continue
      
      if(y < newTable[i].length - 1 &&  newTable[i][y + 1].isBomb) {
        newTable[i][y].number += 1
      }
      if(y < newTable[i].length - 1 && i < newTable.length - 1 && newTable[i + 1][y + 1].isBomb) {
        newTable[i][y].number += 1
      }
      if(i < newTable.length - 1 && newTable[i + 1][y].isBomb) {
        newTable[i][y].number += 1
      }
      if(i < newTable.length - 1 && y > 0 && newTable[i + 1][y - 1].isBomb) {
        newTable[i][y].number += 1
      }
      if(y > 0 && newTable[i][y - 1].isBomb) {
        newTable[i][y].number += 1
      }
      if(y > 0 && i > 0 && newTable[i - 1][y - 1] && newTable[i - 1][y - 1].isBomb) {
        newTable[i][y].number += 1
      }
      if(i > 0 && newTable[i - 1][y] && newTable[i - 1][y].isBomb) {
        newTable[i][y].number += 1
      }
      if(i > 0 && y < newTable[i].length - 1 && newTable[i - 1][y + 1] && newTable[i - 1][y + 1].isBomb) {
        newTable[i][y].number += 1
      }
    }
  }
  return newTable
}
const getEmptyGameTable = () => {
  const result = []
  for(let i = 0; i < 16; i++) {
    const row = []
    for(let y = 0; y < 16; y++) {
      row.push({
        row: i,
        column: y,
        isBomb: false,
        isOpen: false,
        isFinished: false,
        number: 0,
        status: 'default'
      })
    }
    result.push(row)
  }
  return result
}
const cellsSlice = createSlice({
  name: 'cells',
  initialState: {
    cellsList: []
  },
  reducers: {
    generateCellsList: (state) => {
      let result = getEmptyGameTable()
      result = addRandomBomb(result)
      state.cellsList = addTableNumbers(result)
    },
    changeCellStatus: (state, {payload}) => {
      state.cellsList[payload.row][payload.column] = {
        ...state.cellsList[payload.row][payload.column],
        status: payload.status === 'default' ? 'flag' : payload.status === 'flag' ? 'question' : 'default'
      }
      console.log(state.cellsList[payload.row][payload.column].status)
    },
    openCell(state, {payload}) {
      if(state.cellsList[payload.row][payload.column].isBomb) {
        state.cellsList[payload.row][payload.column].isFinished = true
        state.cellsList.forEach(row => {
          row.forEach(cell => {
            if(cell.isBomb) {
              cell.isOpen = true
            }
          })
        })
      } else {
        state.cellsList[payload.row][payload.column].isOpen = true
        if(!state.cellsList[payload.row][payload.column].number) {
          
        }
      }
    }
  }
})

export default cellsSlice.reducer
export const { generateCellsList, changeCellStatus, openCell } = cellsSlice.actions
