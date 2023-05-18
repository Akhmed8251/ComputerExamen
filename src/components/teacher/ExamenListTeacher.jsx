import { useState } from 'react'
import ExamenItemTeacher from './ExamenItemTeacher'
import Popup from '../ui/Popup'
import Button from '../ui/Button'
import { diffBetweenDatesInDays } from '../../utils/date'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'
import DatePicker from '../ui/DatePicker'
import { parsingDate } from '../../utils/date'
import { Controller, useForm } from 'react-hook-form'


const ExamenListTeacher = ({ examens, setExams }) => {
  const examensActive = examens.filter(e => diffBetweenDatesInDays(new Date(e.examDate), new Date()) <= 0)
  const examensNotActive = examens.filter(e => diffBetweenDatesInDays(new Date(e.examDate), new Date()) > 0)

  const [modalDeleteActive, setModalDeleteActive] = useState(false)
  const [modalCopyActive, setModalCopyActive] = useState(false)
  const [examenId, setExamenId] = useState(null)
  const [copyExamenDate, setCopyExamenDate] = useState(null)

  const [deleteExamen, isDeleteLoading, deleteError] = useFetching(async (examenId) => {
    const response = await ExamenService.deleteExamen(examenId)
    if (response.status == 200 || deleteError) {
      console.log(deleteError)
      alert("Экзамен успешно удален!")
      setExams(examens.filter(e => e.examenId != examenId))
      setModalDeleteActive(false)
      setExamenId(null)
    }
  })

  const { handleSubmit, control } = useForm({
    mode: "onSubmit"
  })

  const copyExamen = (data) => {
    let dateInput = document.querySelector(".datepicker")
    data.examDate = parsingDate(dateInput.value)
    data.isDeleted = false
}

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
              <ExamenItemTeacher isEditable={false} onCopyExamen={() => { setExamenId(examen.examenId); setCopyExamenDate(examen.examDate) }} onDelete={() => { setExamenId(examen.examenId); setModalDeleteActive(true) }} key={examen.examenId} examen={examen} />
            )
          }
        </ul>
      </div>
      <Popup active={modalDeleteActive} setActive={setModalDeleteActive}>
        <h2 className="popup__title title">Вы действительно хотите удалить экзамен?</h2>
        <div className="confirm-buttons">
          <Button onClick={() => deleteExamen(examenId)} className={`confirm-button confirm-button--yes${isDeleteLoading ? ' loading' : ''}`} disabled={isDeleteLoading} ><span>Да</span></Button>
          <Button className="confirm-button confirm-button--no" onClick={() => setModalDeleteActive(false)}>Нет</Button>
        </div>
      </Popup>
      <Popup active={modalCopyActive} setActive={setModalCopyActive}>
        <h2 className="popup__title title">Создание пересдачи экзамена</h2>
        <form className='form' onSubmit={handleSubmit(copyExamen)}>
          <label className='form__label' onClick={(evt) => evt.preventDefault()}>
            <span className='form__text'>Дата</span>

            <Controller
              control={control}
              name='examDate'
              render={({ field: { onChange } }) => (
                <div>
                  <DatePicker
                    selected={new Date()}
                    onChange={(newDate) => onChange(newDate)}
                  />
                </div>
              )}
            />
          </label>
          <div className='form__btns'>
            {/* <Button>Создать экзамен</Button>
                            <Link to='/teacher/examens' className='cancel__btn btn'>Отмена</Link> */}
          </div>
        </form>
        <div className="confirm-buttons">
          <Button onClick={() => copyExamen(examenId)} className={`confirm-button confirm-button--yes${isDeleteLoading ? ' loading' : ''}`} disabled={isDeleteLoading} ><span>Да</span></Button>
          <Button className="confirm-button confirm-button--no" onClick={() => setModalDeleteActive(false)}>Нет</Button>
        </div>
      </Popup>
    </>
  )
}

export default ExamenListTeacher