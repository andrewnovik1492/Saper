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
  
  
  export const generateTable = () => {
    let result = getEmptyGameTable()
    result = addRandomBomb(result)
    return addTableNumbers(result)
  }
  
  
  export const isCellBorderBomb = (cell, table) => {
    const row = cell.row
    const column = cell.column
    let y = column
    while(y <= 15) {
      if(!table[row][y].isBomb) {
        table[row][y].isOpen = true
      }
      if(table[row][y].number) {
        table[row][y].isOpen = true
        break
      }
      y++
    }
    y = column
    while(y >= 0) {
      if(!table[row][y].isBomb) {
        table[row][y].isOpen = true
      }
      if(table[row][y].number) {
        table[row][y].isOpen = true
        break
      }
      y--
    }
    if(
      (column < 15 && table[row][column + 1].isOpen && !table[row][column + 1].number) ||
      (column > 0 && table[row][column - 1].isOpen && !table[row][column - 1].number)
      ) {
      return false
    }
    if(
      (column < 15 && table[row][column + 1].isBomb) || 
      (row < 15 && column < 15 && table[row + 1][column + 1].isBomb) ||
      (row < 15 && table[row + 1][column].isBomb) ||
      (row < 15 && column > 0 && table[row + 1][column - 1].isBomb) ||
      (column > 0 && table[row][column - 1].isBomb) ||
      (row > 0 && column > 0 && table[row -1][column - 1].isBomb) ||
      (row > 0 && table[row - 1][column].isBomb) ||
      (row > 0 && column < 15 && table[row - 1][column + 1].isBomb)
    ) {
      return true
    }
    return false
  }
  