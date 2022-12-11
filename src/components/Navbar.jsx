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
  return (
    <nav
      className="bg-bg text-text text-lg p-2 shadow-lg shadow-bg flex-shrink-0 flex gap-8 z-10 leading-6"
    >
      <h1
        className="flex-shrink-0 flex flex-col items-end green-text-shadow"
      >
        <a
          className="text-glow hover:text-text-hover"
          href="https://adventofcode.com/2022"
          target="_blank"
          rel="noreferrer"
        >Advent of Code</a>
        <div>
          <span className="opacity-40">const y=</span>
          <a
            className="text-glow hover:text-text-hover"
            href="https://adventofcode.com/2022"
            target="_blank"
            rel="noreferrer"
          >2022</a>
          <span className="opacity-40">;</span>
        </div>
      </h1>
      <ul className="flex-grow flex flex-wrap gap-x-4 text-center font-light">
        {
          availableDays.map(day => (
            <li key={day}>
              <a
                className="hover:text-text-hover"
                href={`#day-${day}`}
              >[Day {day}]</a>
            </li>
          ))
        }
      </ul>
      <div className="flex-shrink-0 flex items-center justify-center">
        <a
          className="hover:text-text-hover p-2"
          href="https://github.com/FranciscoGaBe/advent-of-code-2022"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </nav>
  )
}

export default Navbar