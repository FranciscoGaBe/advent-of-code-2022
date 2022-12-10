export const day8Part1 = (input, debug) => {
  const data = input.trim().split('\n')
  
  const mappedForest = data.reduce((state, row, rowIndex, forest) => {

    const getTreeData = (r, c) => {
      const key = `${r}-${c}`
      if (state[key]) {
        return state[key]
      }
      const myTrees = forest[r]
      const height = parseInt(myTrees[c])
      const treeData = {
        visible: false,
        left: c === 0 ? true : null,
        top: r === 0 ? true : null,
        right: (c === myTrees.length - 1) ? true : null,
        bottom: (r === forest.length - 1) ? true : null,
        height
      }
      state[key] = treeData
      return treeData
    }

    row.split('').forEach((_, colIndex, trees) => {
      const treeData = getTreeData(rowIndex, colIndex)
      
      if (colIndex === 0 || colIndex === trees.length - 1) {
        treeData.visible = true
      }

      if (rowIndex === 0 || rowIndex === forest.length - 1) {
        treeData.visible = true
      }

      if (treeData.visible) {
        return
      }

      const check = (dir, index, currentTree = treeData) => {
        const increase = (dir === 'left' || dir === 'top') ? -1 : 1
        const horizontal = (dir === 'right' || dir === 'left')
        const lookIndex = index ?? ((horizontal ? colIndex : rowIndex) + increase)
        const lookTree = horizontal ? getTreeData(rowIndex, lookIndex) : getTreeData(lookIndex, colIndex)

        if (lookTree.height >= currentTree.height) {
          currentTree[dir] = false
          return false
        }

        if (lookTree[dir] === null) {
          check(dir, lookIndex + increase, lookTree)
        }

        if (lookTree[dir]) {
          currentTree.visible = true
          currentTree[dir] = true
          return true
        }

        return check(dir, lookIndex + increase, currentTree)
      }

      if (['left', 'top', 'right', 'bottom'].some(dir => check(dir))) {
        return
      }
      
    })

    return state
  }, {})

  return Object.values(mappedForest).filter(tree => tree.visible).length
}

export const day8Part2 = (input, debug) => {
  const data = input.trim().split('\n')
  
  const max = data.reduce((maxScore, trees, rowIndex, forest) => {
    let score = 0
    trees.split('').forEach((tree, colIndex) => {
      let myScore = 1
      const height = parseInt(tree)
      const check = (dir, index) => {
        const increase = (dir === 'left' || dir === 'top') ? -1 : 1
        const horizontal = (dir === 'right' || dir === 'left')
        const lookIndex = index ?? ((horizontal ? colIndex : rowIndex) + increase)
        if (lookIndex < 0 || lookIndex > (horizontal ? (trees.length - 1) : (forest.length - 1))) {
          return 0
        }
        const lookHeight = parseInt(horizontal ? trees[lookIndex] : forest[lookIndex][colIndex])

        if (lookHeight >= height) {
          return 1
        }

        return check(dir, lookIndex + increase) + 1
      }

      ['left', 'top', 'right', 'bottom'].forEach(dir => {
        myScore *= check(dir)
      })

      if (myScore > score) {
        score = myScore
      }
    })

    return score > maxScore ? score : maxScore
  }, 0)

  return max
}