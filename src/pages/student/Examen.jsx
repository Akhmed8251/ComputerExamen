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
    const examenId = useParams()
   
    const startExamenData = useLocation()
    const examenData = startExamenData.state

    const redirect = useNavigate()

    const [getAnswers, isAnswersLoading, answersError] = useFetching(async (answerBlankId) => {
        const response = await AnswerBlankService.getAnswerBlankById(answerBlankId)

        if (response.status == 200 ) {
            setExamenAnswers(response.data.answers)
        }
    })

    const [endExamen, isEndLoading, endError] = useFetching(async (examen) => {
        const response = await AnswerBlankService.endExamenForStudent(examen)

        if (response.status == 200) {
            redirect(`/examens/${examenData.answerBlank.studentId}`)
        }
    })

    useEffect(() => {
        getAnswers(examenData.answerBlank.id)    
    }, [])

    const onEndExamen = () => {
        examenData.answerBlank.answers = examenAnswers; 
        endExamen(examenData.answerBlank) 
    }

  return (
    <>
        <section className='examen'>
            <div className='container container--smaller'>
                <div className="examen__head">
                    <h1 className="examen__title title">{examenData.discipline}</h1>
                    <Countdown onTimeOver={() => { alert('Время экзамена истекло!'); onEndExamen()}} seconds={convertMinutesToSeconds(examenData.examenDuration) - diffBetweenDatesInSeconds(new Date(examenData.answerBlank.createDateTime), new Date())} />
                </div>
                <div className="examen__questions questions">
                    { !isAnswersLoading && <QuestionList isStop={isEndLoading} onUpdate={() => getAnswers(examenData.answerBlank.id)} studentId={examenData.answerBlank.studentId} answerBlankId={examenData.answerBlank.id} examenAnswers={examenAnswers} questions={examenData.examTicket.questions} />}
                </div>
                <div className="examen__bottom">
                    <Button className='examen__btn' onClick={() => setModalActive(true)}>Завершить экзамен</Button>
                    <Countdown seconds={convertMinutesToSeconds(examenData.examenDuration) - diffBetweenDatesInSeconds(new Date(examenData.answerBlank.createDateTime), new Date())}  />
                </div>
            </div>
        </section>
        <Popup active={modalActive} setActive={setModalActive}>
            <Countdown seconds={convertMinutesToSeconds(examenData.examenDuration) - diffBetweenDatesInSeconds(new Date(examenData.answerBlank.createDateTime), new Date())}  />
            <h2 className="popup__title title">Вы действительно хотите завершить экзамен?</h2>
            <div className="confirm-buttons">
                <Button onClick={() => onEndExamen() } className={`confirm-button confirm-button--yes${isEndLoading ? ' loading' : ''}`}><span>Да</span></Button>
                <Button className="confirm-button confirm-button--no" onClick={() => setModalActive(false)}>Нет</Button>
            </div>
        </Popup>
    </>
  )
}

export default Examen