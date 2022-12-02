export const day2Part1 = (input) => {
  const data = input.trim().split('\n')
  const values = {
    A: { X: 4, Y: 8, Z: 3 },
    B: { X: 1, Y: 5, Z: 9 },
    C: { X: 7, Y: 2, Z: 6 },
  }

  return data.reduce((total, round) => {
    const [elf, me] = round.split(' ')
    return total + values[elf][me]
  }, 0)
}

export const day2Part2 = (input) => {
  const data = input.trim().split('\n')
  const values = {
    A: { X: 3, Y: 4, Z: 8 },
    B: { X: 1, Y: 5, Z: 9 },
    C: { X: 2, Y: 6, Z: 7 },
  }

  return data.reduce((total, round) => {
    const [elf, me] = round.split(' ')
    return total + values[elf][me]
  }, 0)
}