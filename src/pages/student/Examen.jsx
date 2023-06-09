import { useEffect, useState } from 'react'
import Countdown from '../../components/ui/Countdown'
import QuestionList from '../../components/student/QuestionList'
import Button from '../../components/ui/Button'
import Popup from '../../components/ui/Popup'
import { useFetching } from '../../hooks/useFetching'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ExamenService from '../../api/ExamenService'
import AnswerBlankService from '../../api/AnswerBlankService'
import { convertMinutesToSeconds } from '../../utils/time'
import { diffBetweenDatesInSeconds } from '../../utils/date'

const Examen = () => {
  const [modalActive, setModalActive] = useState(false)
  const [examenAnswers, setExamenAnswers] = useState(null)
  const [timeToEnd, setTimeToEnd] = useState(915)

  const startExamenData = useLocation()
  const examenData = startExamenData.state

  const redirect = useNavigate()

  const [getAnswers, isAnswersLoading, answersError] = useFetching(async (answerBlankId) => {
    const response = await AnswerBlankService.getAnswerBlankById(answerBlankId)

    if (response.status == 200) {
      setExamenAnswers(response.data.answerBlank.answers)
      setTimeToEnd(response.data.timeToEndInSeconds)
    }
  })

  const [saveAnswerBlank, isSaveLoading, saveAnsError] = useFetching(async (answerBlank, isEndExamen = false) => {
    const response = await AnswerBlankService.updateAnswerBlank(answerBlank)

    if (response.status == 200) {
      alert("Ответы сохранены!")
      //   onUpdate()
      if (!isEndExamen) {
        getAnswers(examenData.id)
      } else {
        endExamen(examenData)
      }
    }
  })

  const [endExamen, isEndLoading, endError] = useFetching(async (answerBlank) => {
    const response = await AnswerBlankService.endExamenForStudent(answerBlank)

    if (response.status == 200) {
      redirect(`/examens/${examenData.studentId}`)
    }
  })

  useEffect(() => {
    getAnswers(examenData.id)
    console.log(examenData)
  }, [])

  const saveAnswers = (isEndExamen = false) => {
    let questionItems = document.querySelectorAll(".questions-item")
    let newAnswers = []
    for (let i = 0; i < questionItems.length; i++) {
      let numberQuestion = parseInt(questionItems[i].querySelector(".questions-item__number").textContent.split("№")[1])
      let question = examenData.examTicket.questions.find(q => q.number == numberQuestion)
      let questionAnswer = questionItems[i].querySelector("textarea").value

      const answer = examenAnswers.find(e => e.questionId == question.id)
      if (answer) {
        answer.textAnswer = questionAnswer
        newAnswers.push(answer)
      } else {
        if (questionAnswer.trim().length > 0) {
          let newAnswer = {
            id: 0,
            studentId: examenData.studentId,
            questionId: question.id,
            answerBlankId: examenData.id,
            textAnswer: questionAnswer,
            isDeleted: false
          }
          newAnswers.push(newAnswer)
        }
      }
    }
    examenData.answers = newAnswers
    saveAnswerBlank(examenData, isEndExamen)
  }

  return (
    <>
      <section className='examen'>
        <div className='container container--smaller'>
          <div className="examen__head">
            <h1 className="examen__title title">{examenData.discipline}</h1>
            {!isAnswersLoading && <Countdown onTimeOver={() => { alert('Время экзамена истекло!'); saveAnswers(true)}} seconds={timeToEnd} />}
          </div>
          <div className="examen__questions questions">
            {!isAnswersLoading && <QuestionList isStop={isEndLoading} onUpdate={() => getAnswers(examenData.id)} studentId={examenData.studentId} answerBlank={examenData} examenAnswers={examenAnswers} questions={examenData.examTicket.questions} />}
          </div>
          <Button className={isSaveLoading ? "loading" : ""} onClick={() => saveAnswers()}><span>Сохранить ответы</span></Button>
          <div className="examen__bottom">
            <Button className='examen__btn' onClick={() => setModalActive(true)}>Завершить экзамен</Button>
            {!isAnswersLoading && <Countdown seconds={timeToEnd} />}
          </div>
        </div>
      </section>
      <Popup active={modalActive} setActive={setModalActive}>
        {!isAnswersLoading && <Countdown seconds={timeToEnd} />}
        <h2 className="popup__title title">Вы действительно хотите завершить экзамен?</h2>
        <div className="confirm-buttons">
          <Button onClick={() => saveAnswers(true)} className={`confirm-button confirm-button--yes${isEndLoading ? ' loading' : ''}`}><span>Да</span></Button>
          <Button className="confirm-button confirm-button--no" onClick={() => setModalActive(false)}>Нет</Button>
        </div>
      </Popup>
    </>
  )
}

export default Examen