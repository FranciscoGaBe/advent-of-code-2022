import * as days from '../days'
import Part from './Part'

const Day = ({ day }) => {
  const parts = Object.keys(days).filter(funcName => {
    return funcName.slice(0, -1) === `day${day}Part`
  })

  return (
    <div id={`day-${day}`} className="py-2">
      <div>
        <h2 className="text-xl text-white white-text-shadow">
          <a
            href={`https://adventofcode.com/2022/day/${day}`}
            target="_blank"
            rel="noreferrer"
          >--- Day {day} ---</a>
        </h2>
        <div>
          {
            parts.map(funcName => (
              <Part key={funcName} func={funcName} day={day} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Day