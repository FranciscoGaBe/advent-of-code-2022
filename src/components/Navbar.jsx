import { useState } from "react"
import * as days from '../days'

export const availableDays = Object.keys(days).reduce((acc, key) => {
  const day = key.match(/^day(\d+)/)?.[1]

  if (!day) {
    return acc
  }

  if (!acc.includes(parseInt(day))) {
    acc.push(parseInt(day))
  }

  return acc
}, []).sort((a, b) => a > b ? 1 : -1)

const Navbar = () => {
  const [show, setShow] = useState(false)

  return (
    <nav className="bg-slate-600 text-white px-4 py-2 shadow-lg flex-shrink-0 top-0 flex gap-4 items-center z-10">
      <h1 className="font-bold uppercase text-xl flex-shrink-0">Advent of Code 2022</h1>
      <button
        type="button"
        className="lg:hidden ml-auto bg-slate-700 w-10 h-6 text-sm shadow border-slate-800 border rounded"
        onClick={() => setShow(!show)}
      ><i className={`fa-solid fa-chevron-${ show ? 'up' : 'down' }`}></i></button>
      <ul className={`
        flex-grow lg:flex gap-1 lg:text-xs text-center
        ${ 
          show ? 
          'fixed lg:static top-11 p-4 lg:p-0 text-lg font-semibold inset-0 bg-slate-600/60 flex items-center justify-center flex-col lg:flex-row'
          : 'hidden'
        }
      `}>
        {
          availableDays.map(day => (
            <li key={day}>
              <a href={`#day-${day}`} onClick={() => setShow(false)}>Day {day}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Navbar