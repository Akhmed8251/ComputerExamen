import { useEffect, useState } from 'react'
import Countdown from '../../components/ui/Countdown'
import QuestionList from '../../components/student/QuestionList'
import Button from '../../components/ui/Button'
import Popup from '../../components/ui/Popup'
import { useFetching } from '../../hooks/useFetching'
import { useLocation, useParams } from 'react-router-dom'
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

    const [getAnswers, isAnswersLoading, answersError] = useFetching(async (answerBlankId) => {
        const response = await AnswerBlankService.getAnswerBlankById(answerBlankId)

        if (response.status >= 200 && response.status < 300) {
            setExamenAnswers(response.data.answers)
        }
    })

    useEffect(() => {
        getAnswers(examenData.answerBlank.id)    
    }, [])
    console.log(examenData)

  return (
    <>
        <section className='examen'>
            <div className='container container--smaller'>
                <div className="examen__head">
                    <h1 className="examen__title title">{examenData.discipline}</h1>
                    <Countdown seconds={convertMinutesToSeconds(examenData.examenDuration) - diffBetweenDatesInSeconds(new Date(examenData.answerBlank.createDateTime), new Date())} />
                </div>
                <div className="examen__questions questions">
                    { !isAnswersLoading && <QuestionList studentId={examenData.answerBlank.studentId} answerBlankId={examenData.answerBlank.id} examenAnswers={examenAnswers} questions={examenData.examTicket.questions} />}
                </div>
                <div className="examen__bottom">
                    <Button className='examen__btn' onClick={() => setModalActive(true)}>Завершить экзамен</Button>
                    <Countdown seconds={convertMinutesToSeconds(examenData.examenDuration) - diffBetweenDatesInSeconds(new Date(examenData.answerBlank.createDateTime), new Date())}  />
                </div>
            </div>
        </section>
        <Popup active={modalActive} setActive={setModalActive}>
            <Countdown seconds={convertMinutesToSeconds(examenData.examenDuration) - diffBetweenDatesInSeconds(new Date(examenData.answerBlank.createDateTime), new Date())}  />
            <h2 className="popup__title title">Вы действительно хотите Завершить экзамен?</h2>
            <div className="confirm-buttons">
                <Button className="confirm-button confirm-button--yes"><span>Да</span></Button>
                <Button className="confirm-button confirm-button--no" onClick={() => setModalActive(false)}>Нет</Button>
            </div>
        </Popup>
    </>
  )
}

export default Examen