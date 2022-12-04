const getPriority = (char) => {
  if (char.toUpperCase() === char) {
    return char.charCodeAt() - 38
  }
  return char.charCodeAt() - 96
}

export const day3Part1 = (input) => {
  const data = input.trim().split('\n')

  return data.reduce((total, backpack) => {
    const items = new Set()
    const len = backpack.length

    for (let i = 0; i < len; i++) {
      const item = backpack[i]
      if (i < len / 2) {
        items.add(item, true)
      }
      else if (items.has(item)) {
        return total + getPriority(item)
      }
    }
    return total
  }, 0)
}

export const day3Part2 = (input) => {
  const data = input.trim().split('\n')
  const groups = new Map()
  let total = 0

  data.forEach((backpack, index) => {
    const group = Math.floor(index / 3)
    if (!groups.has(group)) {
      groups.set(group, new Map())
    }
    const items = groups.get(group)
    const myItems = new Set()
    const len = backpack.length

    for (let i = 0; i < len; i++) {
      const item = backpack[i]
      const localIndex = index % 3
      if (myItems.has(item)) {
        continue
      }

      myItems.add(item)

      if (localIndex % 3 === 0) {
        items.set(item, 1)
        continue
      }

      if (!items.has(item)) {
        continue
      }

      const times = items.get(item)
      if (localIndex % 3 !== 2 || times !== 2) {
        items.set(item, times + 1)
        continue
      }
      total += getPriority(item)
      return
    }
  })

  return total
}