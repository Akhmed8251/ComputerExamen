import { formatDate, diffBetweenDatesInDays, isStartExamen } from '../../utils/date'

const ExamenItem = ({ examen, onClick }) => {
  let dateExamen = ''
  const diffInDays = diffBetweenDatesInDays(new Date(examen.examDate), new Date())

  if (diffInDays == 0) {
    dateExamen = `Сегодня в ${new Date(examen.examDate).getHours()}:${new Date(examen.examDate).getMinutes()}` 
  } else if (diffInDays == 1) {
    dateExamen = `Завтра в ${new Date(examen.examDate).getHours()}:${new Date(examen.examDate).getMinutes()}` 
  } else {
    dateExamen = formatDate(new Date(examen.examDate))
  }

  return (
    <li className={`examens__item examens-item${!isStartExamen(new Date(examen.examDate)) ? ' examens__item--disable' : (isStartExamen(new Date(examen.examDate)) && examen.answerBlank?.endExamenDateTime != null) ? ' examens__item--passed' : ''}`}>
      <span className='examens-item__date'>{dateExamen}</span>
      <button onClick={() => onClick()} className='discipline-btn'>{examen.discipline}</button>
    </li>
  )
}

export default ExamenItem