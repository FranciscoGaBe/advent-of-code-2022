const drawMap = (map, y, x1, x2, sand = [-1, -1]) => {
  const drawing = new Array(y + 1).fill(0).map((_, rowIndex) => {
    const row = map.get(rowIndex)
    const width = x2 - x1

    return new Array(width).fill(0).map((_, index) => {
      const colIndex = index + x1
      return (row && row.get(colIndex)) || (sand[0] === colIndex && sand[1] === rowIndex && 'o') || '.'
    }).join('')
  }).join('\n')

  console.log(`%c${drawing}`, 'font-family: monospace')
}

export const day14Part1 = (input, debug) => {
  const data = input.trim().split('\n')
  const start = [500, 0]

  const { map, deepest, closest, farthest } = data.reduce((state, path) => {
    const points = path.split(' -> ')

    points.forEach((point, index) => {
      if (index === points.length - 1) {
        return
      }

      const [x1, y1] = point.split(',').map(v => parseInt(v))
      const [x2, y2] = points[index + 1].split(',').map(v => parseInt(v))

      const dir = []
      if (x2 === x1) {
        dir.push(0)
      }
      else {
        dir.push(Math.sign(x2 - x1) * 1)
      }
      if (y2 === y1) {
        dir.push(0)
      }
      else {
        dir.push(Math.sign(y2 - y1) * 1)
      }

      const addRock = (x, y) => {
        let row = state.map.get(y)
        if (!row) {
          row = new Map()
          state.map.set(y, row)
        }
        row.set(x, '#')

        if (y > state.deepest) {
          state.deepest = y
        }
        if (x < state.closest) {
          state.closest = x
        }
        if (x + 1 > state.farthest) {
          state.farthest = x + 1
        }
      }

      const pos = [x1, y1]
      addRock(...pos)
      while (x2 !== pos[0] || y2 !== pos[1]) {
        const x = pos[0] + dir[0]
        const y = pos[1] + dir[1]
        pos[0] = x
        pos[1] = y
        addRock(...pos)
      }
    })

    return state
  }, {
    map: new Map([[start[1], new Map([[start[0], '+']])]]),
    deepest: 0,
    closest: start[0],
    farthest: start[0]
  })

  if (debug) {
    drawMap(map, deepest, closest, farthest)
  }
  
  const fall = (sand) => {
    const moves = [[0, 1], [-1, 1], [1, 1]]
    const [x, y] = sand

    if (y >= deepest) {
      return false
    }

    const move = moves.find(move => {
      const moveX = x + move[0]
      const moveY = y + move[1]

      let row = map.get(moveY)
      return !row || !row.has(moveX)
    })

    if (move) {
      return fall([x + move[0], y + move[1]])
    }

    let row = map.get(y)
    if (!row) {
      row = new Map()
      map.set(y, row)
    }

    row.set(x, 'o')
    if (debug) {
      drawMap(map, deepest, closest, farthest, sand)
    }
    return true
  }

  const startFall = () => {
    const sand = [...start]
    const landed = fall(sand)
    if (!landed) {
      return 0
    }

    return 1 + startFall()
  }

  return startFall()
}

export const day14Part2 = (input, debug) => {
  const data = input.trim().split('\n')
  const start = [500, 0]

  let { map, deepest, closest, farthest } = data.reduce((state, path) => {
    const points = path.split(' -> ')

    points.forEach((point, index) => {
      if (index === points.length - 1) {
        return
      }

      const [x1, y1] = point.split(',').map(v => parseInt(v))
      const [x2, y2] = points[index + 1].split(',').map(v => parseInt(v))

      const dir = []
      if (x2 === x1) {
        dir.push(0)
      }
      else {
        dir.push(Math.sign(x2 - x1) * 1)
      }
      if (y2 === y1) {
        dir.push(0)
      }
      else {
        dir.push(Math.sign(y2 - y1) * 1)
      }

      const addRock = (x, y) => {
        let row = state.map.get(y)
        if (!row) {
          row = new Map()
          state.map.set(y, row)
        }
        row.set(x, '#')

        if (y > state.deepest) {
          state.deepest = y
        }
        if (x < state.closest) {
          state.closest = x
        }
        if (x + 1 > state.farthest) {
          state.farthest = x + 1
        }
      }

      const pos = [x1, y1]
      addRock(...pos)
      while (x2 !== pos[0] || y2 !== pos[1]) {
        const x = pos[0] + dir[0]
        const y = pos[1] + dir[1]
        pos[0] = x
        pos[1] = y
        addRock(...pos)
      }
    })

    return state
  }, {
    map: new Map([[start[1], new Map([[start[0], '+']])]]),
    deepest: 0,
    closest: start[0],
    farthest: start[0]
  })

  deepest += 2
  const increase = 100
  map.set(deepest, new Map(
    new Array(farthest - closest + increase * 2).fill('#').map((e, i) => [i + closest - increase, e])
  ))

  if (debug) {
    drawMap(map, deepest, closest, farthest)
  }
  
  const fall = (sand) => {
    const moves = [[0, 1], [-1, 1], [1, 1]]
    const pos = [...sand]

    while (true) {
      const [x, y] = pos

      if (x < closest) {
        closest = x
        map.get(deepest).set(closest, '#')
        map.get(deepest).set(closest - 1, '#')
      }
      else if (x + 1 > farthest) {
        farthest = x + 1
        map.get(deepest).set(farthest, '#')
        map.get(deepest).set(farthest + 1, '#')
      }

      const move = moves.find(move => {
        const moveX = x + move[0]
        const moveY = y + move[1]
  
        let row = map.get(moveY)
        return !row || !row.has(moveX)
      })

      if (move) {
        pos[0] = x + move[0]
        pos[1] = y + move[1]
        continue
      }

      let row = map.get(y)
      if (!row) {
        row = new Map()
        map.set(y, row)
      }
  
      row.set(x, 'o')

      if (debug) {
        drawMap(map, deepest, closest, farthest, sand)
      }

      return pos[0] === start[0] && pos[1] === start[1]
    }
  }

  const startFall = () => {
    const sand = [...start]
    let total = 0

    while (true) {
      const landed = fall(sand)
      total++
      if (landed) {
        break
      }
    }

    return total
  }

  return startFall()
}