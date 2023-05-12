import TextArea from '../../components/ui/TextArea'
import Button from '../../components/ui/Button'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'
import { editTextQuestions, getTicketsForInput, parsingExamTicket } from '../../utils/tickets'
import { useContext } from 'react'
import { AuthContext } from '../../context'

const EditTicketsForm = () => {
  const data = useLocation()
  const examData = data.state

  const redirect = useNavigate()

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      tickets: getTicketsForInput(examData.examTickets)
    }
  });

  console.log(examData)

  const { employeeId } = useContext(AuthContext)


  const [editExamen, isExamenLoading, examError] = useFetching(async (examData) => {
    const response = await ExamenService.editExamen(examData)

    if (response.status == 200) {
      alert("Экзамен успешно обновлен!")
      redirect(`/teacher/examens/${employeeId}`)
    }
  })

  const onSubmit = (data) => {
    examData.employeeId = employeeId
    examData.tickets = parsingExamTicket(data.tickets, examData.examTickets)
    editExamen(examData)
  }

  return (
    <section className='create-tickets'>
      <div className="container container--smaller">
        <div className="create-tickets__inner">
          <h1 className='create-tickets__title title'>Редактирование билетов</h1>
          <form className='create-tickets__form' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name='tickets'
              rules={{
                required: true,
                pattern: {
                  value: /(Билет №\d\n(№\d - .+\n?){1,}\n?){1,}/gmi
                }
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextArea className={error ? 'error' : ''} onChange={(newValue) => onChange(newValue)} value={value} placeholder='Введите вопросы' />
              )}
            />
            <div className='btns'>
              <Button className={`${isExamenLoading ? 'loading' : ''}`} disabled={isExamenLoading}>
                <span>Создать экзамен</span>
              </Button>
              <Button onClick={() => redirect(`/teacher/examens/${employeeId}`)} className='cancel__btn btn'>Отмена</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditTicketsForm