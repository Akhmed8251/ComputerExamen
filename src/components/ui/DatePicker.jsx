import { useState, forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = ({ onChange, selected = new Date() }) => {
  const [date, setDate] = useState(selected)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`datepicker-wrapper${isOpen ? ' open' : ''}`}>
        <ReactDatePicker 
            showIcon
            selected={date}
            className='datepicker'
            dateFormat='dd.MM.yyyy'
            onChange={onChange}
            onSelect={(date) => setDate(date)}
            onCalendarOpen={() => setIsOpen(true)}
            onCalendarClose={() => setIsOpen(false)}
        />
    </div>
  )
}

export default DatePicker