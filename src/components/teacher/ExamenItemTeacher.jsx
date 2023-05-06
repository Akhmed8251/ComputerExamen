import { formatDate } from '../../utils/date'

const ExamenItemTeacher = ({ examen }) => {
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
      <div className='examens__data data'>
        <span className='data__stage'>{`${examen.course} курс ${examen.group} группа`}</span>
        <span className='data__department'>{examen.department.deptName}</span>
      </div>
      <button className='discipline-btn'>{examen.discipline}</button>
    </li>
  )
}

export default ExamenItemTeacher