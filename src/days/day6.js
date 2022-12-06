export const day6Part1 = (input, debug) => {
  const data = input.trim()
  let last4 = data.slice(0, 4)

  for (let i = 4; i < data.length; i++) {
    if ((new Set(last4.split(''))).size === 4) {
      return i
    }
    last4 = last4.slice(1) + data[i]
  }

  return 0
}

export const day6Part2 = (input) => {
  const data = input.trim()
  let last14 = data.slice(0, 14)

  for (let i = 14; i < data.length; i++) {
    if ((new Set(last14.split(''))).size === 14) {
      return i
    }
    last14 = last14.slice(1) + data[i]
  }

  return 0
}