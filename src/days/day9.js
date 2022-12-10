const drawMap = (mapBoundaries, head, knots, message = '', visited = null) => {
  const myKnots = knots.length > 2 ? knots : [knots]
  const debugMap = new Array(mapBoundaries[1][1] - mapBoundaries[1][0]).fill(0)
    .reduce((map, _, colIndex) => {
      const trueColIndex = mapBoundaries[1][0] + colIndex
      let row = new Array(mapBoundaries[0][1] - mapBoundaries[0][0]).fill(0).reduce((mapRow, _, rowIndex) => {
        const trueRowIndex = mapBoundaries[0][0] + rowIndex
        if (visited === null) {
          if (head[0] === trueRowIndex && head[1] === trueColIndex) {
            return mapRow + 'H'
          }
  
          const knotIndex = myKnots.findIndex(knot => knot[0] === trueRowIndex && knot[1] === trueColIndex)
          if (knotIndex > -1) {
            return mapRow + (myKnots.length === 1 ? 'T' : (knotIndex + 1))
          }
        }

        if (!trueRowIndex && !trueColIndex) {
          return mapRow + 's'
        }

        if (visited) {
          if (visited.has(trueColIndex) && visited.get(trueColIndex).has(trueRowIndex)) {
            return mapRow + '#'
          }
        }

        return mapRow + '.'
      }, '')

      row += '\n'
      return row + map
    }, '')

  console.log(`%c${message}

${debugMap}`, 'font-family:monospace')
}

export const day9Part1 = (input, debug) => {
  const data = input.trim().split('\n')

  const moves = {
    L: [-1, 0],
    U: [0, 1],
    R: [1, 0],
    D: [0, -1]
  }

  const initialState = { head: [0, 0], tail: [0, 0], total: 1, visited: new Map([[0, new Map([[0, true]])]]) }

  if (debug) {
    initialState.mapBoundaries = [[0, 6], [0, 5]]

    drawMap(initialState.mapBoundaries, initialState.head, initialState.tail, '== Initial State ==')
  }
  
  const { visited, total } = data.reduce((state, command) => {
    const [dir, times] = command.split(' ')
    const move = moves[dir]
    const { head, tail, visited, mapBoundaries } = state

    new Array(parseInt(times)).fill(0).forEach(() => {

      head[0] += move[0]
      head[1] += move[1]

      const horizontalDistance = head[0] - tail[0]
      const verticalDistance = head[1] - tail[1]
      const distance = Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2))

      if (distance > 2 || Math.abs(horizontalDistance) > 1) {
        tail[0] += Math.sign(horizontalDistance) * 1
      }

      if (distance > 2 || Math.abs(verticalDistance) > 1) {
        tail[1] += Math.sign(verticalDistance) * 1
      }

      let row = visited.get(tail[1])
      if (!row) {
        row = new Map()
        visited.set(tail[1], row)
      }
      if (!row.has(tail[0])) {
        row.set(tail[0], true)
        state.total += 1
      }

      if (debug) {
        drawMap(mapBoundaries, head, tail, `== ${command} ==`)
      }
    })

    return state

  }, initialState)

  if (debug) {
    drawMap(initialState.mapBoundaries, [], [], '== Visited ==', visited)
  }

  return total
}

export const day9Part2 = (input, debug) => {
  const data = input.trim().split('\n')

  const moves = {
    L: [-1, 0],
    U: [0, 1],
    R: [1, 0],
    D: [0, -1]
  }

  const initialState = {
    head: [0, 0],
    knots: new Array(9).fill(0).map(() => [0, 0]),
    total: 1,
    visited: new Map([[0, new Map([[0, true]])]])
  }

  if (debug) {
    initialState.mapBoundaries = [[-11, 15], [-5, 16]]

    drawMap(initialState.mapBoundaries, initialState.head, initialState.knots, '== Initial State ==')
  }
  
  const { visited, total } = data.reduce((state, command) => {
    const [dir, times] = command.split(' ')
    const move = moves[dir]
    const { head, knots, visited, mapBoundaries } = state

    new Array(parseInt(times)).fill(0).forEach(() => {

      head[0] += move[0]
      head[1] += move[1]

      knots.forEach((knot, index) => {
        const frontKnow = index === 0 ? head : knots[index - 1]

        const horizontalDistance = frontKnow[0] - knot[0]
        const verticalDistance = frontKnow[1] - knot[1]
        const distance = Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2))

        if (distance > 2 || Math.abs(horizontalDistance) > 1) {
          knot[0] += Math.sign(horizontalDistance) * 1
        }
  
        if (distance > 2 || Math.abs(verticalDistance) > 1) {
          knot[1] += Math.sign(verticalDistance) * 1
        }

        if (index === knots.length - 1) {
          let row = visited.get(knot[1])
          if (!row) {
            row = new Map()
            visited.set(knot[1], row)
          }
          if (!row.has(knot[0])) {
            row.set(knot[0], true)
            state.total += 1
          }
        }
      })

      if (debug) {
        drawMap(mapBoundaries, head, knots, `== ${command} ==`)
      }
    })

    return state

  }, initialState)

  if (debug) {
    drawMap(initialState.mapBoundaries, [], [], '== Visited ==', visited)
  }

  return total
}