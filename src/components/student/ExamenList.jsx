import { useState } from 'react'
import ExamenItem from './ExamenItem'
import Popup from '../ui/Popup'
import Button from '../ui/Button'
import ExamenListTeacher from '../teacher/ExamenListTeacher'
import { Link } from 'react-router-dom'

const ExamenList = ({ examens, studentId }) => {
  const [modalActive, setModalActive] = useState(false)
  const [examenId, setExamenId] = useState(null)

  return (
    <>
      <ul className='examens__list'>
        {
          examens.map(examen =>
            <ExamenItem onClick={() => { setExamenId(examen.examenId); setModalActive(true)}} key={examen.examenId} examen={examen} />
          )
        }
      </ul>
      <Popup active={modalActive} setActive={setModalActive} hiddenData={[
        {
          name: 'examenId',
          value: examenId
        }
      ]}>
        <h2 className="popup__title title">Вы действительно хотите начать экзамен?</h2>
        <div className="confirm-buttons">
          <Link to={`/examen/${studentId}/${examenId}`} className="confirm-button confirm-button--yes btn"><span>Да</span></Link>
          <Button className="confirm-button confirm-button--no" onClick={() => setModalActive(false)}>Нет</Button>
        </div>
      </Popup>
    </>
  )
}

export default ExamenList