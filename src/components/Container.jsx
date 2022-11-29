import Day from "./Day"
import { availableDays } from "./Navbar"

const Container = () => {
  return (
    <div className="text-gray-900 px-4 py-2 flex-grow overflow-auto">
      {
        availableDays.map(day => (
          <Day key={day} day={day} />
        ))
      }
    </div>
  )
}

export default Container