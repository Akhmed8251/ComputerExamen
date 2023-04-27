import React from 'react'
import { formatDate } from '../../utils/date'

const ExamenItem = ({ examen, onClick }) => {
  const dateToFormat = formatDate(new Date(examen.examDate))
  const dateNowToFormat = formatDate(new Date())
  let dateExamen = ""

  if (dateToFormat == dateNowToFormat) {
    dateExamen = 'Сегодня'
  } else {
    const differenceInDay =  (+dateToFormat.split(".")[0]) - (+dateNowToFormat.split(".")[0])
    if (differenceInDay == 1) {
      dateExamen = 'Завтра'
    } else {
      dateExamen = dateToFormat
    }
  } 

  return (
    <li className={`examens__item${dateExamen != 'Сегодня' ? ' examens__item--disable' : ''}`}>
      <span className='examens__date'>{dateExamen}</span>
      <button onClick={() => onClick()} className='discipline-btn'>{examen.discipline}</button>
    </li>
  )
}

export default ExamenItem