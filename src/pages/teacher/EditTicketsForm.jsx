import TextArea from '../../components/ui/TextArea'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'
import { editTextQuestions, editTickets, getTicketsForInput, parsingExamTicket } from '../../utils/tickets'
import { useContext } from 'react'
import { AuthContext } from '../../context'

const EditTicketsForm = () => {
  const data = useLocation()
  const examData = data.state

  const redirect = useNavigate()

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      tickets: examData.examTickets
    }
  });

  const { fields, append, remove
  } = useFieldArray({
    control,
    name: "tickets"
  });


  const { employeeId } = useContext(AuthContext)

  const [editExamen, isExamenLoading, examError] = useFetching(async (examData) => {
    const response = await ExamenService.editExamen(examData)

    if (response.status == 200) {
      alert("Экзамен успешно обновлен!")
      redirect(`/teacher/examens/${employeeId}`)
    }
  })

  const onSubmit = (data) => {
    //examData.employeeId = employeeId
    //examData.tickets = editTickets(data.tickets, examData.examTickets)

    console.log(data)
    //editExamen(examData)
  }

  const appendQuestion = (ticketId, numberQuestion) => {
    const question =  {
      id: 0,
      examTicketId: ticketId,
      number: numberQuestion,
      text: '',
      isDeleted: false
    }
    //добавить в состояние
  }

  const removeQuestion = (questionId) => {
    //удаление в базе if questionId != 0
  }

  const removeTicket = (ticketId) => {
    //удалить их базы если ticketId != 0
  }

  return (
    <section className='create-tickets'>
      <div className="container container--smaller">
        <div className="create-tickets__inner">
          <h1 className='create-tickets__title title'>Редактирование билетов</h1>
          <form className='create-tickets__form' onSubmit={handleSubmit(onSubmit)}>            
            {
              fields.map((ticket, index, tickets) =>
                <li key={index} className='create-tickets__item ticket-item'>
                  <div className="ticket-item__body">
                    <div className='ticket-item__number'>Билет №{index + 1}</div>
                    <div className='ticket-item__question'>
                      {
                        ticket.questions.map((question, idx) =>
                          <div key={idx}>
                            <span>№{idx + 1}</span>
                            <Controller
                              control={control}
                              name={`tickets.${index}.questions.${idx}.text`}
                              rules={{
                                required: true
                              }}
                              render={({ field: { onChange }, fieldState: { error } }) => (
                                //<TextArea onChange={(e) => changeTicket(ticket.number, e.target.value)} placeholder='Введите вопросы' width={400} />
                                <div>
                                  <Input className={error ? 'error' : ''} onChange={(newValue) => onChange(newValue)} placeholder='Введите вопросы' value={question.text} />
                                  {
                                    ticket.questions.length !== 1 && <Button type="button" className='ticket-item__remove' onClick={() => removeQuestion(question.id)}>Удалить вопрос</Button>
                                  }
                                  {
                                    ticket.questions.length - 1 == idx && <Button type="button" className='ticket-item__remove' onClick={() => appendQuestion(ticket.id, ticket.questions.length)}>Добавить вопрос</Button>
                                  }
                                </div>
                              )}
                            />
                          </div>
                        )
                      }
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
                      tickets.length !== 1 && <Button type="button" className='ticket-item__remove' onClick={() => removeTicket(ticket.id)}>Удалить билет</Button>
                    }
                  </div>
                </li>
              )
            }
            <div className='btns'>
              <Button type="submit" className={`${isExamenLoading ? 'loading' : ''}`} disabled={isExamenLoading}>
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