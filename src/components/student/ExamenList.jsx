import { useState } from 'react'
import ExamenItem from './ExamenItem'
import Popup from '../ui/Popup'
import Button from '../ui/Button'
import ExamenListTeacher from '../teacher/ExamenListTeacher'

const ExamenList = ({ examens }) => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <>
      <ul className='examens__list'>
        {
          examens.map(examen =>
            <ExamenItem onClick={() => setModalActive(true)} key={examen.id} examen={examen} />
          )
        }
      </ul>
      <Popup active={modalActive} setActive={setModalActive}>
        <h2 className="popup__title title">Вы действительно хотите начать экзамен?</h2>
        <div className="confirm-buttons">
          <Button className="confirm-button confirm-button--yes"><span>Да</span></Button>
          <Button className="confirm-button confirm-button--no" onClick={() => setModalActive(false)}>Нет</Button>
        </div>
      </Popup>
    </>
  )
}

export default ExamenList