import TextArea from '../../components/ui/TextArea'
import Button from '../../components/ui/Button'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'
import { parsingExamTicket } from '../../utils/tickets'

const EditTicketsForm = () => {
  const data = useLocation()
  const examData = data.state

  const redirect = useNavigate()

  const { control, handleSubmit } = useForm({
    mode: "onSubmit"
  });


  const [createExamen, isExamenLoading, examError] = useFetching(async (examData) => {
    const response = await ExamenService.createExamen(examData)

    if (response.status == 200) {
      alert("Экзамен успешно обновлен!")
      redirect('/teacher/examens/ca38f6e6-e893-4151-9d7c-ea21ab532047')
    }
  })

  const onSubmit = (data) => {
    examData.employeeId = 'ca38f6e6-e893-4151-9d7c-ea21ab532047'
    
    examData.tickets = parsingExamTicket(data.tickets)
    console.log(examData)
    createExamen(examData)
  }

  return (
    <section className='create-tickets'>
      <div className="container container--smaller">
        <div className="create-tickets__inner">
          <h1 className='create-tickets__title title'>Редактирование билетов</h1>
          <div>{JSON.stringify(examData)}</div>
          <form className='create-tickets__form' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name='tickets'
              rules={{
                required: true,
                pattern: {
                  value: /(Билет №\d\n(№\d - .+\n?){1,}\n?){1,}/gmi,
                  message: "12321332"
                }
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                //<TextArea onChange={(e) => changeTicket(ticket.number, e.target.value)} placeholder='Введите вопросы' width={400} />
                <TextArea className={error ? 'error' : ''} onChange={(newValue) => onChange(newValue)} placeholder='Введите вопросы' />
              )}
            />
            <div className='btns'>
              <Button className={`${isExamenLoading ? 'loading' : ''}`} disabled={isExamenLoading}>
                <span>Создать экзамен</span>
              </Button>
              <Button onClick={() => redirect('/teacher/examens/ca38f6e6-e893-4151-9d7c-ea21ab532047')} className='cancel__btn btn'>Отмена</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditTicketsForm