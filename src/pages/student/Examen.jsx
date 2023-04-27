import React, { useState } from 'react'
import Countdown from '../../components/ui/Countdown'
import QuestionList from '../../components/QuestionList'
import Button from '../../components/ui/Button'
import Popup from '../../components/ui/Popup'

const Examen = () => {
    const [modalActive, setModalActive] = useState(false)
    const questions = [
        {
            id: 1,
            number: 1,
            text: "Равномощные множества. Теорема о неравномощности множестванатуральных чисел и множества действительных чисел"
        },
        {
            id: 2,
            number: 2,
            text: "Равномощные множества. Теорема о неравномощности множестванатуральных чисел и множества действительных чисел"
        },
        {
            id: 3,
            number: 3,
            text: "Равномощные множества. Теорема о неравномощности множестванатуральных чисел и множества действительных чисел"
        }
    ]
  return (
    <>
        <section className='examen'>
            <div className='container container--smaller'>
                <div className="examen__head">
                    <h1 className="examen__title title">Дополнительные главы математического ана-лиз</h1>
                    <Countdown seconds={300} />
                </div>
                <div className="examen__questions questions">
                    <QuestionList questions={questions} />
                </div>
                <div className="examen__bottom">
                    <Button className='examen__btn' onClick={() => setModalActive(true)}>Завершить экзамен</Button>
                    <Countdown seconds={300} />
                </div>
            </div>
        </section>
        <Popup active={modalActive} setActive={setModalActive}>
            <Countdown seconds={300} />
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