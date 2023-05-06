import { useState } from 'react'
import ExamenItemTeacher from './ExamenItemTeacher'
import Popup from '../ui/Popup'
import Button from '../ui/Button'


const ExamenListTeacher = ({ examens }) => {
  console.log(examens)
  return (
    <>
      <ul className='examens-teacher__list'>
        {
          examens.map(examen =>
            <ExamenItemTeacher key={examen.examenId} examen={examen} />
          )
        }
      </ul>
    </>
  )
}

export default ExamenListTeacher