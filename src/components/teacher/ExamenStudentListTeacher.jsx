import { Link } from "react-router-dom"


const ExamenStudentListTeacher = (students) => {
  return (
    <ul className='examen-teacher__list'>
      {/* {
        students.map(student => 
          <li className='examen-teacher__item examen-teacher__item--success'>
            <a href='' className='examen-teacher__item-link'>1</a>
          </li>
        )
      } */}
      
      <li className='examen-teacher__item examen-teacher__item--failed'>
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
      </li>
    </ul>
  )
}

export default ExamenStudentListTeacher