import TextArea from '../../components/ui/TextArea'
import Button from '../../components/ui/Button'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'

const CreateTicketsForm = () => {
  const data = useLocation()
  const examData = data.state

  const redirect = useNavigate()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      tickets: [
        {
          id: 0,
          number: 0,
          examenId: 0,
          questions: [
            {
              id: 0,
              examTicketId: 0,
              number: 0,
              text: '',
              isDeleted: false
            }
          ],
          isDeleted: false
        }
      ]
    }
  });

  const { fields, append, remove
  } = useFieldArray({
    control,
    name: "tickets"
  });

  const [createExamen, isExamenLoading, examError] = useFetching(async (examData) => {
    const response = await ExamenService.createExamen(examData)

    if (response.status == 200) {
      alert("Экзамен успешно создан!")
      redirect('/teacher/examens/ca38f6e6-e893-4151-9d7c-ea21ab532047')
    }
  })

  const onSubmit = (data) => {
    let numberCount = 1;
    data.tickets.forEach(ticket => {
      ticket.number = numberCount
      ticket.questions[0].number = numberCount
      ticket.questions[0].text = ticket.question
      delete ticket.question
      numberCount++
    })

    examData.employeeId = 'ca38f6e6-e893-4151-9d7c-ea21ab532047'
    examData.tickets = data.tickets
    console.log(examData)
    createExamen(examData)
  }

  return (
    <section className='create-tickets'>
      <div className="container container--smaller">
        <div className="create-tickets__inner">
          <h1 className='create-tickets__title title'>Создание билетов</h1>
          <form className='create-tickets__form' onSubmit={handleSubmit(onSubmit)}>
            <ul className="create-tickets__list">
              {
                fields.map((_, index, tickets) =>
                  <li key={index} className='create-tickets__item ticket-item'>
                    <div className="ticket-item__body">
                      <div className='ticket-item__number'>Билет №{index + 1}</div>
                      <div className='ticket-item__question'>
                        <Controller
                          control={control}
                          name={`tickets.${index}.question`}
                          rules={{
                            required: true
                          }}
                          render={({ field: { onChange }, fieldState: { error } }) => (
                            //<TextArea onChange={(e) => changeTicket(ticket.number, e.target.value)} placeholder='Введите вопросы' width={400} />
                            <TextArea className={error ? 'error' : ''} onChange={(newValue) => onChange(newValue)} placeholder='Введите вопросы' width={400} />
                          )}
                        />
                      </div>
                    </div>
                    <div className='btns'>
                      {
                        tickets.length - 1 === index && <Button onClick={() =>
                          append({
                            id: 0,
                            number: 0,
                            examenId: 0,
                            questions: [
                              {
                                id: 0,
                                examTicketId: 0,
                                number: 0,
                                text: '',
                                isDeleted: false
                              }
                            ],
                            isDeleted: false
                          })
                        } className='ticket-item__add'>Добавить билет</Button>
                      }
                      {
                        tickets.length !== 1 && <Button type="button" className='ticket-item__remove' onClick={() => remove(index)}>Удалить билет</Button>
                      }
                    </div>
                  </li>
                )
              }
            </ul>
            <div className='btns'>
              <Button className={`${isExamenLoading ? 'loading' : ''}`} disabled={isExamenLoading}>
                <span>Создать экзамен</span>
              </Button>
              <Button onClick={() => redirect(-1)} className='cancel__btn btn'>Отмена</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateTicketsForm