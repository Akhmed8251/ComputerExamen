import { Link } from "react-router-dom"


const ExamenStudentListTeacher = ({ students, deptName }) => {
  const getStudentExamenStatusClass = (student) => {
    if (student.totalScore) {
      if (student.totalScore > 50) {
        return 'examen-teacher__item--success'
      } else {
        return 'examen-teacher__item--failed'
      }
    } else if (student.answerBlank != null && student.answerBlank.endExamenDateTime != null) {
      return 'examen-teacher__item--no-checking'
    } else {
      return ''
    }
  }

  const getStudentNumber = (student) => {
    const statusClass = getStudentExamenStatusClass(student)
    
    if (statusClass == "examen-teacher__item--failed" || statusClass == "examen-teacher__item--success") {
      return student.totalScore
    } else {
      return student.studentId
    }
  } 

  return (
    <ul className='examen-teacher__list'>
      {
        students.map(student => 
          <li key={student.studentId} className={`examen-teacher__item ${getStudentExamenStatusClass(student)}`}>
            {
              getStudentExamenStatusClass(student) == "examen-teacher__item--no-checking"
                ? <Link to='/teacher/answers-check' state={{ ...student, deptName: deptName }} className='examen-teacher__item-link'>{student.studentId}</Link>
                : <div className="examen-teacher__item-link">{getStudentNumber(student)}</div>
            }
          </li>
        )
      }
      
      {/* <li className='examen-teacher__item examen-teacher__item--failed'>
        <a href='' className='examen-teacher__item-link'>2</a>
      </li>
      <li className='examen-teacher__item examen-teacher__item--no-checking'>
        <Link to='/teacher/' className='examen-teacher__item-link'>3</Link>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>4</a>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>5</a>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>6</a>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>7</a>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>8</a>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>9</a>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>10</a>
      </li>
      <li className='examen-teacher__item'>
        <a href='' className='examen-teacher__item-link'>11</a>
      </li> */}
    </ul>
  )
}

export default ExamenStudentListTeacher