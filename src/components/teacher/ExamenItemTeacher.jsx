import { Link } from 'react-router-dom'
import { diffBetweenDatesInDays, formatDate } from '../../utils/date'
import Button from '../ui/Button'

const ExamenItemTeacher = ({ examen, onDelete, isEditable }) => {

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
    <li className={`examens__item examens-item${dateExamen == 'Сегодня' ? '' : isEditable ? ' examens__item--disable' : ' examens__item--active'}`}>
      <span className='examens-item__date'>{dateExamen}</span>
      <div className='examens-item__data data'>
        <span className='data__stage'>{`${examen.course} курс ${examen.group} группа`}</span>
        <span className='data__department'>{examen.department.deptName}</span>
      </div>
      <div className="examens-item__btns">
        {
          dateExamen == 'Сегодня'
            ? <Link to={`/teacher/examen/${examen.examenId}`} className='discipline-btn'>{examen.discipline}</Link>
            : <Link to={`/teacher/examen-results/${examen.examenId}`} className='discipline-btn btn'>{examen.discipline}</Link>
        }
        {isEditable && <Link to={`/teacher/edit-examen/${examen.examenId}`} className='edit-examen btn'></Link>}
        <Button onClick={() => onDelete()} className='delete-examen'></Button>   
      </div>
    </li>
  )
}

export default ExamenItemTeacher