import { Link } from 'react-router-dom'
import { formatDate, isStartExamen } from '../../utils/date'
import Button from '../ui/Button'

const ExamenItemTeacher = ({ examen, onDelete, onCopyExamen, isEditable }) => {

  let dateExamen = ''
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

  return (
    <li className={`examens__item examens-item${!isStartExamen(new Date(examen.examDate)) ? ' examens__item--disable' : (isStartExamen(new Date(examen.examDate)) && examen.endExamDate != null) ? ' examens__item--passed' : ''}`}>
      <span className='examens-item__date'>{dateExamen}</span>
      <div className='examens-item__data data'>
        <span className='data__stage'>{`${examen.course} курс ${examen.group} группа`}</span>
        <span className='data__department'>{examen.department.deptName}</span>
      </div>
      <div className="examens-item__btns">
        {
          (isStartExamen(new Date(examen.examDate)) && examen.endExamDate == null)
            ? <Link to={`/teacher/examen/${examen.examenId}`} state={ { course: examen.course, group: examen.group, deptName: examen.department.deptName, examenName: examen.discipline } } className='discipline-btn'>{examen.discipline}</Link>
            : <Link to={`/teacher/examen-results/${examen.examenId}`} state={ { course: examen.course, group: examen.group, deptName: examen.department.deptName, examenName: examen.discipline } } className='discipline-btn'>{examen.discipline}</Link>
        }
        {isEditable && <Link to={`/teacher/edit-examen`} state={examen} className='edit-examen btn'></Link>}
        <Button onClick={() => onDelete()} className='delete-examen'></Button>   
        <Button onClick={() => onCopyExamen()}>Создать пересдачу</Button>
      </div>
    </li>
  )
}

export default ExamenItemTeacher