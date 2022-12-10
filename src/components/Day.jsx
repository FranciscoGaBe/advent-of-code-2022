import * as days from '../days'
import Part from './Part'

const Day = ({ day }) => {
  const parts = Object.keys(days).filter(funcName => {
    return funcName.slice(0, -1) === `day${day}Part`
  })

  return (
    <div id={`day-${day}`} className="py-2">
      <div className="bg-slate-700 rounded-lg shadow-lg px-4 py-2 text-white">
        <h2 className="text-2xl font-bold">Day {day}</h2>
        <div className='p-2'>
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