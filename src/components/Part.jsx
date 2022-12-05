import { useEffect, useState, useCallback } from 'react'

import { CopyBlock, dracula } from 'react-code-blocks'

import * as days from '../days'
import * as inputs from '../inputs'
import * as examples from '../examples'

const useResult = (func, input, debug = false) => {
  const [result, setResult] = useState('Running...')
  const refresh = useCallback(async () => {
    const data = await days[func](input, debug)
    setResult(data)
  }, [func, input, debug])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { result, refresh }
}

const useExample = (func) => {
  const { result, refresh } = useResult(func, examples[`${func}ExampleInput`], true)
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

  return { state, refresh }
}

const Part = ({ func, day }) => {
  const { result, refresh } = useResult(func, inputs[`day${day}`])
  const { state, refresh: refreshExample } = useExample(func)
  const part = func.match(/Part(\d)$/)?.[1]

  const code = `const day${day}Part${part} = ${days[func].toString()}

day${day}Part${part}(input)   // Result: ${result}`
  
  return (
    <div className="text-white my-2">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Retry (for debugging purposes)"
            onClick={() => refresh()}
          >
            <i className="fa-solid fa-arrows-rotate" />
          </button>
          <h3 className="text-lg font-bold mb-1">Part { part }</h3>
        </div>
        <button
          type="button"
          className="ml-auto mr-2"
          title="Retry example (for debugging purposes)"
          onClick={() => refreshExample()}
        >
          <i className="fa-solid fa-arrows-rotate" />
        </button>
        <div className="mr-2">Example: </div>
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