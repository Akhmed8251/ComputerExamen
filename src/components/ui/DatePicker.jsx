import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'
import Input from './Input'

const DatePicker = () => {
  const [date, setDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className={`datepicker-wrapper${isOpen ? ' open' : ''}`}>
        <ReactDatePicker 
            showIcon
            selected={date}
            className='datepicker'
            dateFormat='dd.MM.yyyy'
            onSelect={(newDate) => setDate(newDate)}
            onCalendarOpen={() => setIsOpen(true)}
            onCalendarClose={() => setIsOpen(false)}
        />
    </div>
  )
}

export default DatePicker