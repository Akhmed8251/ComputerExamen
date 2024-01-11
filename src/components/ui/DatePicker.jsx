import { useState } from 'react'
import ReactDatePicker from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru';

const DatePicker = ({ onChange, selected = new Date(), showTimeSelect = true }) => {
  const [date, setDate] = useState(selected)
  const [isOpen, setIsOpen] = useState(false)

  const onChange1 = (newDate) => {
    onChange()
    onSelect(newDate)
  }

  const onSelect = (newDate) => {
    setDate(newDate)
  }

  return (
    <div className={`datepicker-wrapper${isOpen ? ' open' : ''}`}>
        <ReactDatePicker 
            locale={ru}
            showIcon
            showTimeSelect={showTimeSelect}
            selected={date}
            className='datepicker'
            dateFormat={showTimeSelect ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy'}
            timeCaption='Время'
            timeIntervals={15}
            onChange={onChange1}
            //onSelect={(newDate) => setDate(newDate)}
            onSelect={(date) => onSelect(date)}
            
            onCalendarOpen={() => setIsOpen(true)}
            onCalendarClose={() => setIsOpen(false)}
        />
    </div>
  )
}

export default DatePicker