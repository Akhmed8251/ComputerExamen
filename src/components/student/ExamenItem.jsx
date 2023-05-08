import { formatDate, diffBetweenDatesInDays } from '../../utils/date'

const ExamenItem = ({ examen, onClick }) => {
  let dateExamen = ''
  const diffInDays = diffBetweenDatesInDays(new Date(examen.examDate), new Date)
  if (diffInDays == 0) {
    dateExamen = 'Сегодня'
  } else if (diffInDays == 1) {
    dateExamen = 'Завтра'
  } else {
    dateExamen = formatDate(new Date(examen.examDate))
  }

  return (
    <li className={`examens__item examens-item${dateExamen == 'Сегодня' ? '' : diffInDays <= -1 ? ' examens__item--active' : ' examens__item--disable'}`}>
      <span className='examens-item__date'>{dateExamen}</span>
      <button onClick={() => onClick()} className='discipline-btn'>{examen.discipline}</button>
    </li>
  )
}

export default ExamenItem