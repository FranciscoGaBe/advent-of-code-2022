export const day10Part1 = (input, debug) => {
  const data = input.trim().split('\n')
  return data.reduce((state, command) => {
    const [name, value] = command.split(' ')
    const nextCheck = state.checks[0]
    let commandCycle = name === 'noop' ? 1 : 2



    const endCycle = state.cycle + commandCycle
    if (endCycle > nextCheck) {
      state.checks.shift()
      state.total += state.x * nextCheck
    }
    if (name === 'addx') {
      state.x += parseInt(value)
    }
    state.cycle = endCycle
    return state
  }, { checks: [20, 60, 100, 140, 180, 220], total: 0, x: 1, cycle: 1 }).total
}

const printMessage = (text) => {
  console.log(`%c${text}`, 'font-family: monospace')
}

export const day10Part2 = (input, debug) => {
  const data = input.trim().split('\n').reverse()

  if (debug) {
    printMessage(`Sprite position: ###${'.'.repeat(37)}`)
  }

  const { CRT } = new Array(6).fill(0).reduce((state, _, rowIndex, rows) => {
    const row = new Array(40).fill(0).reduce((CRTRow, _, colIndex) => {
      if (debug) {
        printMessage('')
      }
      const index = rowIndex * 40 + colIndex
      const cycle = (index + 1).toString()
      let pixel = '.'
      if ((colIndex >= state.x - 1) && (colIndex <= state.x + 1)) {
        pixel = '#'
      }
      const newCRTRow = CRTRow + pixel
      if (state.cooldown === 0) {
        const command = data.pop()
        state.command = command
        const [name] = command.split(' ')
        if (debug) {
          printMessage(`Start cycle ${cycle.padStart(3, ' ')}: begin executing ${command}`)
        }

        state.cooldown += name === 'noop' ? 1 : 2
      }



      if (debug) {
        printMessage(`During cycle ${cycle.padStart(2, ' ')}: CRT draws a pixel in position ${index}`)
        printMessage(`Current CRT row: ${newCRTRow}`)
      }

      state.cooldown--

      if (state.cooldown === 0) {
        const [name, value] = state.command.split(' ')
        if (name === 'addx') {
          state.x += parseInt(value)
        }
        if (debug) {
          let endCycleMessage = `End of cycle ${cycle}: finish executing ${state.command}`
          let spritePositionMessage = 'Sprite position: '
          if (name === 'addx') {
            endCycleMessage += ` (Register X is now ${state.x})`
          }
          if (state.x < -1 || state.x > 40) {
            spritePositionMessage += '.'.repeat(40)
          }
          else if (state.x === -1) {
            spritePositionMessage += '#' + '.'.repeat(39)
          }
          else if (state.x === 0) {
            spritePositionMessage += '##' + '.'.repeat(38)
          }
          else if (state.x === 40) {
            spritePositionMessage += '.'.repeat(39) + '#'
          }
          else if (state.x === 39) {
            spritePositionMessage += '.'.repeat(38) + '##'
          }
          else {
            spritePositionMessage += '.'.repeat(state.x - 1) + '###' + '.'.repeat(40 - state.x + 1)
          }

          printMessage(endCycleMessage)
          if (name === 'addx') {
            printMessage(spritePositionMessage)
          }
        }
      }

      return newCRTRow
    }, '')

    state.CRT += row
    if (rowIndex !== rows.length - 1) {
      state.CRT += '\n'
    }
    return state
  }, { CRT: '', x: 1, cooldown: 0, command: '' })

  if (debug) {
    printMessage(`== CRT ==
${CRT}
`)
  }

  return CRT
}