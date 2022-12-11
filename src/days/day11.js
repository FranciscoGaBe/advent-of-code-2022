const getNumbers = (text) => {
  return text.match(/\d+/g).map(number => parseInt(number))
}

const getMonkeys = (input) => {
  const data = input.trim().split('\n')
  const monkeys = []
  let lcm = 1

  for (let i = 0; i < data.length; i += 7) {
    const [number, startingItems, operation, test, ifTrue, ifFalse] = data.slice(i, i + 6)
    const [var1, operator, var2] = operation.split(' = ').slice(-1)[0].split(' ')
    const monkey = {
      items: getNumbers(startingItems),
      operation: (val) => {
        const [variable1, variable2] = [var1, var2].map(variable => {
          if (variable === 'old') {
            return val
          }
          return parseInt(variable)
        })

        if (operator === '*') {
          return variable1 * variable2
        }
        return variable1 + variable2
      },
      test: getNumbers(test)[0],
      ifTrue: getNumbers(ifTrue)[0],
      ifFalse: getNumbers(ifFalse)[0],
      inspectedItems: 0
    }

    lcm *= monkey.test
    
    monkeys[getNumbers(number)[0]] = monkey
  }
  
  return { monkeys, lcm }
}

export const day11Part1 = (input, debug) => {  
  const { monkeys } = new Array(20).fill(0).reduce(({ monkeys }, _, roundIndex) => {
    const newMonkeys = monkeys.map(monkey => {
      const items = [...monkey.items]
      monkey.items = []
      monkey.inspectedItems += items.length

      items.forEach((item) => {
        const worryLevel = Math.floor(monkey.operation(item) / 3)
        const isTrue = worryLevel % monkey.test === 0
        monkeys[monkey[isTrue ? 'ifTrue' : 'ifFalse']].items.push(worryLevel)
      })
      
      return monkey
    })

    if (debug) {
      const message = newMonkeys.reduce((text, monkey, index) => {
        return text + `\nMonkey ${index}: ${monkey.items.join(', ')}`
      }, `After round ${roundIndex + 1}, the monkeys are holding items with these worry levels:`)
      console.log(message + '\n ')
    }

    return { monkeys: newMonkeys }
  }, getMonkeys(input))

  if (debug) {
    const message = monkeys.reduce((text, monkey, index) => {
      return text + `\nMonkey ${index} inspected items ${monkey.inspectedItems} times.`
    }, 'Total number of times each monkey inspects items:')
    console.log(message)
  }

  return monkeys.reduce((highest, monkey) => {
    const { inspectedItems } = monkey
    const index = highest.findIndex(value => inspectedItems > value)
    if (index > -1) {
      highest.splice(index, 1, inspectedItems)
    }
    return highest.sort((a, b) => a > b ? 1 : -1)
  }, [0, 0]).reduce((total, val) => total * val, 1)
}

export const day11Part2 = (input, debug) => {
  const { monkeys } = new Array(10000).fill(0).reduce(({ monkeys, lcm }, _, roundIndex) => {
    const newMonkeys = monkeys.map(monkey => {
      const items = [...monkey.items]
      monkey.items = []
      monkey.inspectedItems += items.length

      items.forEach((item) => {
        const worryLevel = monkey.operation(item) % lcm
        const isTrue = worryLevel % monkey.test === 0
        monkeys[monkey[isTrue ? 'ifTrue' : 'ifFalse']].items.push(worryLevel)
      })
      
      return monkey
    })

    if (debug) {
      const message = newMonkeys.reduce((text, monkey, index) => {
        return text + `\nMonkey ${index}: ${monkey.items.join(', ')}`
      }, `After round ${roundIndex + 1}, the monkeys are holding items with these worry levels:`)
      console.log(message + '\n ')
    }

    return { monkeys: newMonkeys, lcm }
  }, getMonkeys(input, true))

  if (debug) {
    const message = monkeys.reduce((text, monkey, index) => {
      return text + `\nMonkey ${index} inspected items ${monkey.inspectedItems} times.`
    }, 'Total number of times each monkey inspects items:')
    console.log(message)
  }

  return monkeys.reduce((highest, monkey) => {
    const { inspectedItems } = monkey
    const index = highest.findIndex(value => inspectedItems > value)
    if (index > -1) {
      highest.splice(index, 1, inspectedItems)
    }
    return highest.sort((a, b) => a > b ? 1 : -1)
  }, [0, 0]).reduce((total, val) => total * val, 1)
}