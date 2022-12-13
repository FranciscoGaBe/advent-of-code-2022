import { useState, useLayoutEffect, useRef } from 'react'
import * as days from '../days'
import Part from './Part'

const Day = ({ day }) => {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  const parts = Object.keys(days).filter(funcName => {
    return funcName.slice(0, -1) === `day${day}Part`
  })

  useLayoutEffect(() => {
    if (seen || !ref.current) {
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && setSeen(true)
    })
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [seen])

  return (
    <div ref={ref} id={`day-${day}`} className="py-2">
      <div>
        <h2 className="text-xl text-white white-text-shadow">
          <a
            href={`https://github.com/FranciscoGaBe/advent-of-code-2022/blob/main/src/days/day${day}.js`}
            target="_blank"
            rel="noreferrer"
          >--- Day {day} ---</a>
        </h2>
        <div>
          {
            parts.map(funcName => (
              <Part key={funcName} play={seen} func={funcName} day={day} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Day