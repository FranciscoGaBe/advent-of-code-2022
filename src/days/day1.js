export const day1Part1 = (input) => {
  const data = input.split('\n')

  return data.reduce((obj, val) => {
    const calories = parseInt(val)
    if (isNaN(calories)) {
      if (obj.elf > obj.max) {
        obj.max = obj.elf
      }
      obj.elf = 0
    }
    else {
      obj.elf += calories
    }
    return obj
  }, { elf: 0, max: 0 }).max
}

export const day1Part2 = (input) => {
  const data = input.split('\n')

  return data.reduce((obj, val) => {
    const calories = parseInt(val)
    if (isNaN(calories)) {
      const index = obj.top3.findIndex(n => n < obj.elf)
      if (index > -1) {
        obj.total += obj.elf - obj.top3[index]
        obj.top3.splice(index, 1, obj.elf)
        obj.top3.sort((a, b) => a > b ? 1 : -1)
      }
      obj.elf = 0
    }
    else {
      obj.elf += calories
    }
    return obj
  }, { elf: 0, total: 0, top3: [0, 0, 0] }).total
}