export const day4Part1 = (input) => {
  const data = input.trim().split('\n')

  return data.reduce((total, pair) => {
    const [elf1, elf2] = pair.split(',')
    const [start1, end1] = elf1.split('-').map(val => parseInt(val))
    const [start2, end2] = elf2.split('-').map(val => parseInt(val))

    if (start1 >= start2 && end1 <= end2) {
      return total + 1
    }
    if (start2 >= start1 && end2 <= end1) {
      return total + 1
    }
    return total
  }, 0)
}

export const day4Part2 = (input) => {
  const data = input.trim().split('\n')

  return data.reduce((total, pair) => {

    const overlap = pair.split(',').flatMap(pair => {
      return pair.split('-').map(val => parseInt(val))
    }).some((limit, index, limits) => {
      const myLimits = [...limits]
      if (index < 2) {
        myLimits.splice(0, 2)
      }
      else {
        myLimits.splice(2, 2)
      }
      const [start , end] = myLimits

      return start <= limit && limit <= end
    })

    return overlap ? (total + 1) : total

  }, 0)
}