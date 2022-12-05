export const day5Part1 = (input, debug) => {
  const data = input.split('\n').slice(1, -1)

  const { stacks } = data.reduce((obj, line) => {
    if (obj.stage === 'numbers') {
      obj.stage = 'start'
      return obj
    }
    if (obj.stage === 'boxes') {
      const boxes = []
      for (let i = 0; i < line.length; i += 4) {
        const box = line.slice(i, i + 3)
        if (box[0] === '[' && box[2] === ']') {
          boxes.push(box[1])
        }
        else {
          boxes.push(null)
        }
      }

      if (boxes.every(box => box === null)) {
        obj.stage = 'numbers'
        return obj
      }

      boxes.forEach((box, index) => {
        if (box === null) {
          return
        }

        let stack = obj.stacks[index] || []
        if (!obj.stacks[index]) {
          obj.stacks[index] = stack
        }
        stack.unshift(box)
      })
      return obj
    }
    
    const [move, from, to] = line.match(/\d+/g)
    const fromStack = obj.stacks[from - 1]
    const toStack = obj.stacks[to - 1]
    toStack.push(...fromStack.splice(-move).reverse())

    return obj
  }, { stacks: [], stage: 'boxes' })

  return stacks.map(stack => stack[stack.length - 1]).join('')
}

export const day5Part2 = (input) => {
  const data = input.split('\n').slice(1, -1)

  const { stacks } = data.reduce((obj, line) => {
    if (obj.stage === 'numbers') {
      obj.stage = 'start'
      return obj
    }
    if (obj.stage === 'boxes') {
      const boxes = []
      for (let i = 0; i < line.length; i += 4) {
        const box = line.slice(i, i + 3)
        if (box[0] === '[' && box[2] === ']') {
          boxes.push(box[1])
        }
        else {
          boxes.push(null)
        }
      }

      if (boxes.every(box => box === null)) {
        obj.stage = 'numbers'
        return obj
      }

      boxes.forEach((box, index) => {
        if (box === null) {
          return
        }

        let stack = obj.stacks[index] || []
        if (!obj.stacks[index]) {
          obj.stacks[index] = stack
        }
        stack.unshift(box)
      })
      return obj
    }
    
    const [move, from, to] = line.match(/\d+/g)
    const fromStack = obj.stacks[from - 1]
    const toStack = obj.stacks[to - 1]
    toStack.push(...fromStack.splice(-move))

    return obj
  }, { stacks: [], stage: 'boxes' })

  return stacks.map(stack => stack[stack.length - 1]).join('')
}