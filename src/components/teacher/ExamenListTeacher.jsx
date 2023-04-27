import React, { useState } from 'react'
import ExamenItemTeacher from './ExamenItemTeacher'
import Popup from '../ui/Popup'
import Button from '../ui/Button'


const ExamenListTeacher = ({ examens }) => {

  return (
    <>
      <ul className='examens-teacher__list'>
        {
          examens.map(examen =>
            <ExamenItemTeacher key={examen.id} examen={examen} />
          )
        }
      </ul>
    </>
  )
}

export default ExamenListTeacher