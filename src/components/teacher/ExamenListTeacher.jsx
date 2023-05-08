import { useState } from 'react'
import ExamenItemTeacher from './ExamenItemTeacher'
import Popup from '../ui/Popup'
import Button from '../ui/Button'
import { diffBetweenDatesInDays } from '../../utils/date'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'


const ExamenListTeacher = ({ examens, update }) => {
  const examensActive = examens.filter(e => diffBetweenDatesInDays(new Date(e.examDate), new Date()) <= 0)
  const examensNotActive = examens.filter(e => diffBetweenDatesInDays(new Date(e.examDate), new Date()) > 0)

  const [modalDeleteActive, setModalDeleteActive] = useState(false)
  const [modalStartActive, setModalStartActive] = useState(false)
  const [examenId, setExamenId] = useState(null)

  const [deleteExamen, isDeleteLoading, deleteError] = useFetching(async (examenId) => {
    const response = await ExamenService.deleteExamen(examenId)
    if (response.status == 200) {
      alert("Экзамен успешно удален!")
      setModalDeleteActive(false)
      setExamenId(null)
      update()
    }
  })

  return (
    <>
      <h1 className='title'>Экзамены</h1>
      <ul className='examens-teacher__list'>
        {
          examensNotActive.map(examen =>
            <ExamenItemTeacher isEditable={true} onDelete={() => { setExamenId(examen.examenId); setModalDeleteActive(true) }} key={examen.examenId} examen={examen} />
          )
        }
      </ul>
      <div className="examens-teacher__passed">
          <h2 className='title'>Пройденные</h2>
          <ul className='examens-teacher__list'>
            {
              examensActive.map(examen =>
                <ExamenItemTeacher isEditable={false} onDelete={() => { setExamenId(examen.examenId); setModalDeleteActive(true) }} key={examen.examenId} examen={examen} />
              )
            }
          </ul>
      </div>
      <Popup active={modalDeleteActive} setActive={setModalDeleteActive}>
        <h2 className="popup__title title">Вы действительно хотите удалить экзамен?</h2>
        <div className="confirm-buttons">
          <Button onClick={() => {console.log(examenId); deleteExamen(examenId)}} className={`confirm-button confirm-button--yes${isDeleteLoading ? ' loading' : ''}`} disabled={isDeleteLoading} ><span>Да</span></Button>
          <Button className="confirm-button confirm-button--no" onClick={() => setModalDeleteActive(false)}>Нет</Button>
        </div>
      </Popup>
    </>
  )
}

export default ExamenListTeacher