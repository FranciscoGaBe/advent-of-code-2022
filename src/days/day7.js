export const day7Part1 = (input) => {
  const data = input.trim().split('\n')
  const root = { parent: null, dirs: {}, files: {}, size: 0 }

  const { dirs } = data.reduce((state, line) => {
    if (line[0] === '$') {
      const [command, argument] = line.slice(2).split(' ')
      if (command === 'cd') {
        if (argument === '/') {
          state.current = state.root
          return state
        }
        if (argument === '..') {
          state.current = state.current.parent
          return state
        }
        state.current = state.current.dirs[argument]
        return state
      }
      return state
    }

    const [size, name] = line.split(' ')
    if (size === 'dir') {
      if (!(name in state.current.dirs)) {
        const newDir = { parent: state.current, dirs: {}, files: {}, size: 0 }
        state.current.dirs[name] = newDir
        state.dirs.add(newDir)
      }
      return state
    }

    if (!(name in state.current.files)) {
      state.current.files[name] = parseInt(size)
      
      let current = state.current
      do {
        current.size += parseInt(size)
        current = current.parent
      } while (current !== null)
    }
    return state
  }, { root, current: root, dirs: new Set([root]) })
  
  return Array.from(dirs.values()).reduce((total, dir) => {
    if (dir.size > 1e5) {
      return total
    }
    return total + dir.size
  }, 0)
}

export const day7Part2 = (input) => {
  const data = input.trim().split('\n')
  const root = { parent: null, dirs: {}, files: {}, size: 0 }

  const { dirs, root: { size } } = data.reduce((state, line) => {
    if (line[0] === '$') {
      const [command, argument] = line.slice(2).split(' ')
      if (command === 'cd') {
        if (argument === '/') {
          state.current = state.root
          return state
        }
        if (argument === '..') {
          state.current = state.current.parent
          return state
        }
        state.current = state.current.dirs[argument]
        return state
      }
      return state
    }

    const [size, name] = line.split(' ')
    if (size === 'dir') {
      if (!(name in state.current.dirs)) {
        const newDir = { parent: state.current, dirs: {}, files: {}, size: 0 }
        state.current.dirs[name] = newDir
        state.dirs.add(newDir)
      }
      return state
    }

    if (!(name in state.current.files)) {
      state.current.files[name] = parseInt(size)
      
      let current = state.current
      do {
        current.size += parseInt(size)
        current = current.parent
      } while (current !== null)
    }
    return state
  }, { root, current: root, dirs: new Set([root]) })
  
  const required = 3e7 - 7e7 + size
  return Array.from(dirs.values()).reduce((smallest, dir) => {
    if (dir.size < required) {
      return smallest
    }
    return dir.size < smallest ? dir.size : smallest
  }, Infinity)
}