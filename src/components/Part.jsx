import { CopyBlock, dracula } from 'react-code-blocks'
import * as days from '../days'

const Part = ({ func, day }) => {
  const part = func.match(/Part(\d)$/)?.[1]

  const code = `const day${day}Part${part} = ${days[func].toString()}

day${day}Part${part}()   // Result: ${days[func]()}`
  
  return (
    <div className="text-white my-2">
      <h3 className="text-lg font-bold mb-1">Part { part }</h3>
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