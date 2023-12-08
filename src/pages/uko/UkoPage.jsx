import { useState, useEffect } from 'react'
import Popup from '../../components/ui/Popup'
import Button from '../../components/ui/Button'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'
import Select from '../../components/ui/Select'
import { Link, useParams } from 'react-router-dom'
import { parsingDate } from '../../utils/date'
import { Controller, useForm } from 'react-hook-form';
import DatePicker from '../../components/ui/DatePicker'


const UkoPage = () => {
  const urlParans = useParams()
  const userId = urlParans.id

  const [examens, setExamens] = useState([])
  const [modalDeleteActive, setModalDeleteActive] = useState(false)
  const [modalDeleteConfirmActive, setModalDeleteConfirmActive] = useState(false)
  const [modalCopyActive, setModalCopyActive] = useState(false)
  const [examenId, setExamenId] = useState(null)
  const [copyExamenDate, setCopyExamenDate] = useState(new Date())

  const [getExamensByEmployeeId, isExamensLoading, examError] = useFetching(async (userId) => {
    const response = await ExamenService.getExamensByEmployeeId(userId)

    if (response.status == 200) {
      const dataArr = []
      response.data.forEach(dataItem => {
        dataArr.push({
          value: dataItem.examenId,
          label: dataItem.discipline
        })
      })
      setExamens(dataArr)
    }
  })

  useEffect(() => {
    getExamensByEmployeeId(userId)
  }, [])

  const [deleteExamen, isDeleteLoading, deleteError] = useFetching(async (examenId) => {
    const response = await ExamenService.deleteExamen(examenId)
    if (response.status == 200 || deleteError) {
      console.log(deleteError)
      alert("Экзамен успешно удален!")
      setExamens(examens.filter(e => e.examenId != examenId))
      setModalDeleteConfirmActive(false)
      setExamenId(null)
    }
  })

  const [copyExamen, isCopyLoading, copyError] = useFetching(async (examenId, newDateExamen) => {
    const response = await ExamenService.copyExamen(examenId, newDateExamen)

    if (response.status == 200) {
      alert("Пересдача успешно создана!")
      setCopyExamenDate(new Date())
      setExamenId(null)
      setModalCopyActive(false)
    }
  })

  const handleDeleteExamen = () => {
    setModalDeleteActive(false)
    setModalDeleteConfirmActive(true)
  }

  const onCopyExamen = () => {
    let dateInput = document.querySelector(".datepicker")
    const examDate = parsingDate(dateInput.value)
    copyExamen(examenId, examDate)
  }

  const { control, handleSubmit } = useForm({
    mode: "onSubmit"
  })

  return (
    <>
      <div className="container">
        <div className="examen-actions">
          <Link to={'/uko/create-examen'} className='examens-teacher__btn btn'>Создать экзамен</Link>
          <Link to={`/uko/edit-examen`} className='edit-examen btn'>Изменить экзамен</Link>
          <Button onClick={() => setModalDeleteActive(true)} className='delete-examen'>Удалить экзамен</Button>
          <Button onClick={() => setModalCopyActive(true)}>Создать пересдачу</Button>
        </div>
      </div>
      <Popup active={modalDeleteActive} setActive={setModalDeleteActive}>
        <h2 className="popup__title title">Удаление экзамена</h2>
        <form className='form' style={{ marginBottom: 20 }} onSubmit={handleSubmit(handleDeleteExamen)}>
          <label className='form__label' onClick={(evt) => evt.preventDefault()}>
            <span className='form__text'>Экзамен</span>
            <Controller
              control={control}
              name='examenId'
              rules={{
                required: true
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                  <div className={error ? 'error' : ''}>
                      <Select 
                        onChange={(newValue) => { setExamenId(newValue.value); onChange(newValue.value) }}
                        placeholder='Выберите экзамен'
                        options={examens}
                        isLoading={isExamensLoading}
                        isDisabled={isExamensLoading}
                      />
                  </div>
              )}
            />
          </label>
          <Button className="delete-examen"><span>Удалить</span></Button>
        </form>
      </Popup>
      <Popup active={modalDeleteConfirmActive} setActive={setModalDeleteConfirmActive}>
        <h2 className="popup__title title">Вы действительно хотите удалить экзамен?</h2>
        <div className="confirm-buttons">
          <Button onClick={() => deleteExamen(examenId)} className={`confirm-button confirm-button--yes${isDeleteLoading ? ' loading' : ''}`} disabled={isDeleteLoading} ><span>Да</span></Button>
          <Button className="confirm-button confirm-button--no" onClick={() => setModalDeleteConfirmActive(false)}>Нет</Button>
        </div>
      </Popup>
      <Popup active={modalCopyActive} setActive={setModalCopyActive}>
        <h2 className="popup__title title">Создание пересдачи экзамена</h2>
        <form className='form' style={{ marginBottom: 20 }} onSubmit={handleSubmit(onCopyExamen)}>
          <label className='form__label' onClick={(evt) => evt.preventDefault()}>
            <span className='form__text'>Экзамен</span>
            <Controller
              control={control}
              name='examenId'
              rules={{
                required: true
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                  <div className={error ? 'error' : ''}>
                      <Select 
                        onChange={(newValue) => { setExamenId(newValue.value); onChange(newValue.value) }}
                        placeholder='Выберите экзамен'
                        options={examens}
                        isLoading={isExamensLoading}
                        isDisabled={isExamensLoading}
                      />
                  </div>
              )}
            />
          </label>
          <label className='form__label' onClick={(evt) => evt.preventDefault()}>
            <span className='form__text'>Дата</span>
            <Controller
              control={control}
              name='copyExamDate'
              render={({ field: { onChange }, fieldState: { errors } }) => (
                <div className={errors?.root?.message ? ' error' : ''}>
                  <DatePicker
                    selected={copyExamenDate}
                    onChange={(newDate) => onChange(newDate)}
                  />
                  <div>{errors ? errors.root?.message : ""}</div>
                </div>
              )}
            />
          </label>
          <Button className={`${isCopyLoading ? ' loading' : ''}`} disabled={isCopyLoading}><span>Создать</span></Button>
        </form>

      </Popup>
    </>
  )
}

export default UkoPage