import { useEffect, useState } from 'react'

import { CopyBlock, dracula } from 'react-code-blocks'

import * as days from '../days'
import * as inputs from '../inputs'
import * as examples from '../examples'

const useResult = (func, input) => {
  const [result, setResult] = useState('Running...')

  useEffect(() => {
    const run = async () => {
      const data = await days[func](input)
      setResult(data)
    }

    run()
  }, [func, input])

  return result
}

const useExample = (func) => {
  const result = useResult(func, examples[`${func}ExampleInput`])
  const [state, setState] = useState('running')
  
  const expectedResult = examples[`${func}ExampleResult`]

  useEffect(() => {
    if (result === 'Running...') {
      return
    }
    const newState = result === expectedResult ? 'pass' : 'fail'
    if (newState === 'fail') {
      console.error(`Expected ${expectedResult}, got ${result}`)
    }
    setState(newState)
  }, [result, expectedResult])

  return state
}

const Part = ({ func, day }) => {
  const result = useResult(func, inputs[`day${day}`])
  const state = useExample(func)
  const part = func.match(/Part(\d)$/)?.[1]

  const code = `const day${day}Part${part} = ${days[func].toString()}

day${day}Part${part}(input)   // Result: ${result}`
  
  return (
    <div className="text-white my-2">
      <div className="flex items-center">
        <h3 className="text-lg font-bold mb-1">Part { part }</h3>
        <div className="ml-auto mr-2">Example: </div>
        <div
          className={`
            w-4 h-4 rounded-full
            ${ state === 'running' ? 'bg-yellow-300' : state === 'pass' ? 'bg-green-600' : 'bg-red-600' }
          `}
          title={state}
        >&nbsp;</div>
      </div>
      <CopyBlock
        text={code}
        theme={dracula}
        language="javascript"
        codeBlock
        wrapLines
        showLineNumbers
      />
    </div>
  )
}

export default Part