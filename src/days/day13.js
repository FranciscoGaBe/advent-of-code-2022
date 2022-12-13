export const day13Part1 = (input, debug) => {
  const data = input.trim().split('\n')
  let log = ''

  const compare = (item1, item2, level = 0) => {
    if (item1 === undefined) {
      if (debug) {
        log += `${'  '.repeat(level + 1)}- Left side ran out of items, so inputs are in the right order\n`
      }
      return true
    }
    if (item2 === undefined) {
      if (debug) {
        log += `${'  '.repeat(level + 1)}- Right side ran out of items, so inputs are not in the right order\n`
      }
      return false
    }

    if (debug) {
      log += `${'  '.repeat(level)}- Compare ${JSON.stringify(item1)} vs ${JSON.stringify(item2)}\n`
    }
    
    if (typeof item1 === 'number' && typeof item2 === 'number') {
      if (item1 === item2) {
        return null
      }

      const rightOrder = item1 < item2

      if (debug) {
        if (rightOrder) {
          log += `${'  '.repeat(level + 1)}- Left side is smaller, so inputs are in the right order\n`
        }
        else {
          log += `${'  '.repeat(level + 1)}- Right side is smaller, so inputs are not in the right order\n`
        }
      }
      return rightOrder
    }

    if (!Array.isArray(item1) || !Array.isArray(item2)) {
      if (debug) {
        const isLeft = !Array.isArray(item1)
        log += `${'  '.repeat(level + 1)}- Mixed types; convert ${isLeft ? 'left' : 'right'} to [${isLeft ? item1 : item2}] and retry comparison\n`
      }
      
      return compare(
        Array.isArray(item1) ? item1 : [item1],
        Array.isArray(item2) ? item2 : [item2],
        level + 1
      ) 
    }
    
    for (let i = 0; ; i++) {
      const element1 = item1[i]
      const element2 = item2[i]

      if (element1 === undefined && element2 === undefined) {
        break
      }
      
      const comparation = compare(element1, element2, level + 1)

      if (comparation !== null) {
        return comparation
      }

    }
    
    return null
  }

  const total = new Array(Math.ceil(data.length / 3)).fill(0).reduce((acc, _, index) => {
    const [item1, item2] = data.slice(index * 3, index * 3 + 2).map(item => JSON.parse(item))
    if (debug) {
      log += `== Pair ${index + 1} ==\n`
    }
    const comparation = compare(item1, item2)
    if (debug) {
      console.log(log + '\n')
      log = ''
    }
    if (!comparation) {
      return acc
    }
    return acc + index + 1
  }, 0)

  return total
}

export const day13Part2 = (input, debug) => {
  const data = input.trim().split('\n')

  const compare = (item1, item2) => {
    if (item1 === undefined) {
      return true
    }
    if (item2 === undefined) {
      return false
    }

    if (typeof item1 === 'number' && typeof item2 === 'number') {
      if (item1 === item2) {
        return null
      }

      return item1 < item2
    }

    if (!Array.isArray(item1) || !Array.isArray(item2)) {
      return compare(
        Array.isArray(item1) ? item1 : [item1],
        Array.isArray(item2) ? item2 : [item2]
      ) 
    }
    
    for (let i = 0; ; i++) {
      const element1 = item1[i]
      const element2 = item2[i]

      if (element1 === undefined && element2 === undefined) {
        break
      }
      
      const comparation = compare(element1, element2)

      if (comparation !== null) {
        return comparation
      }

    }
    
    return null
  }

  const dividers = ['[[2]]', '[[6]]']
  const sorted = [...data, ...dividers].filter(d => d.trim() !== '').map(d => JSON.parse(d)).sort((a, b) => {
    return compare(a, b) ? -1 : 1
  })

  if (debug) {
    console.log(sorted)
  }

  return dividers.reduce((total, divider) => {
    return total * (sorted.findIndex(d => JSON.stringify(d) === divider) + 1)
  }, 1)
}
