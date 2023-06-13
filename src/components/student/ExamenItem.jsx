import { formatDate, diffBetweenDatesInDays, isStartExamen } from '../../utils/date'

const ExamenItem = ({ examen, onClick }) => {
  let dateExamen = ''
  // const diffInDays = diffBetweenDatesInDays(new Date(examen.examDate), new Date())

  // if (diffInDays == 0) {
  //   let minutes = new Date(examen.examDate).getMinutes()
  //   dateExamen = `Сегодня в ${new Date(examen.examDate).getHours()}:${minutes > 9 ? minutes : "0" + minutes}` 
  // } else if (diffInDays == 1) {
  //   let minutes = new Date(examen.examDate).getMinutes()
  //   dateExamen = `Завтра в ${new Date(examen.examDate).getHours()}:${minutes > 9 ? minutes : "0" + minutes}` 
  // } else {
  //   dateExamen = formatDate(new Date(examen.examDate))
  // }
  
  let dateNow = new Date()
  let dateTimeExamen = new Date(examen.examDate)

  if (dateNow.getDate() == dateTimeExamen.getDate() && dateNow.getMonth() == dateTimeExamen.getMonth()) {
    let minutes = dateTimeExamen.getMinutes() 
    dateExamen = `Сегодня в ${dateTimeExamen.getHours()}:${minutes > 9 ? minutes : "0" + minutes}` 
  } else {
    dateNow.setDate(dateNow.getDate() + 1)
    if (dateNow.getDate() == dateTimeExamen.getDate() && dateNow.getMonth() == dateTimeExamen.getMonth()) {
      let minutes = dateTimeExamen.getMinutes()
      dateExamen = `Завтра в ${dateTimeExamen.getHours()}:${minutes > 9 ? minutes : "0" + minutes}` 
    } else {
      dateExamen = formatDate(new Date(examen.examDate))
    }
  }

  return (
    <li className={`examens__item examens-item${!examen.isActiveNow ? ' examens__item--disable' : (examen.isActiveNow && examen.answerBlank?.endExamenDateTime != null) ? ' examens__item--passed' : ''}`}>
      <span className='examens-item__date'>{dateExamen}</span>
      <button onClick={() => onClick()} className='discipline-btn'>{examen.discipline}</button>
    </li>
  )
}

export default ExamenItem