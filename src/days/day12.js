export const day12Part1 = (input, debug) => {
  const data = input.trim().split('\n')
  const { map, start, end } = data.reduce((state, rowData) => {
    const row = []
    state.map.push(row)

    rowData.split('').forEach((cellData) => {
      let value = cellData.charCodeAt() - 97

      if (cellData === 'S') {
        state.start = [state.map.length - 1, row.length]
        value = 0
      }
      else if (cellData === 'E') {
        state.end = [state.map.length - 1, row.length]
        value = 25
      }

      row.push(value)
    })

    return state
  }, { map: [], start: null, end: null })

  const moves = [[0, 1], [1, 0], [-1, 0], [0, -1]]
  const visited = new Map()
  const stack = [[start, 0]]
  let requiredSteps = null

  while (!requiredSteps) {
    const [[y, x], steps] = stack.pop()

    if (!visited.has(y)) {
      visited.set(y, new Map())
    }
    const visitedRow = visited.get(y)
    if (visitedRow.get(x)) {
      continue
    }
    visitedRow.set(x, true)

    if (y === end[0] && x === end[1]) {
      requiredSteps = steps
    }

    const height = map[y][x]
    moves.forEach((move) => {
      const moveRow = map[y + move[0]]
      if (!moveRow) {
        return
      }
      const moveHeight = moveRow[x + move[1]]
      if (moveHeight === undefined) {
        return
      }
      if (moveHeight > (height + 1)) {
        return
      }
      stack.push([[y + move[0], x + move[1]], steps + 1])
    })
    stack.sort((a, b) => a[1] > b[1] ? -1 : 1)
  }

  return requiredSteps
}

export const day12Part2 = (input, debug) => {
  const data = input.trim().split('\n')
  const { map, starts, end } = data.reduce((state, rowData) => {
    const row = []
    state.map.push(row)

    rowData.split('').forEach((cellData) => {
      let value = cellData.charCodeAt() - 97

      if (cellData === 'S') {
        value = 0
      }
      else if (cellData === 'E') {
        state.end = [state.map.length - 1, row.length]
        value = 25
      }

      if (value === 0) {
        state.starts.push([state.map.length - 1, row.length])
      }

      row.push(value)
    })

    return state
  }, { map: [], starts: [], end: null })

  const minimalSteps = starts.reduce((min, start) => {
    const moves = [[0, 1], [1, 0], [-1, 0], [0, -1]]
    const visited = new Map()
    const stack = [[start, 0]]
    let requiredSteps = null

    while (!requiredSteps) {
      const next = stack.pop()
      if (!next) {
        return min
      }
      const [[y, x], steps] = next

      if (!visited.has(y)) {
        visited.set(y, new Map())
      }
      const visitedRow = visited.get(y)
      if (visitedRow.get(x)) {
        continue
      }
      visitedRow.set(x, true)

      if (y === end[0] && x === end[1]) {
        requiredSteps = steps
      }

      const height = map[y][x]
      moves.forEach((move) => {
        const moveRow = map[y + move[0]]
        if (!moveRow) {
          return
        }
        const moveHeight = moveRow[x + move[1]]
        if (moveHeight === undefined) {
          return
        }
        if (moveHeight > (height + 1)) {
          return
        }
        stack.push([[y + move[0], x + move[1]], steps + 1])
      })
      stack.sort((a, b) => a[1] > b[1] ? -1 : 1)
    }

    return requiredSteps < min ? requiredSteps : min
  }, Infinity)

  return minimalSteps
}