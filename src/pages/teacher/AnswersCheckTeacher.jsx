import { useState } from 'react'
import Popup from '../../components/ui/Popup'
import Button from '../../components/ui/Button'
import AnswerList from '../../components/teacher/AnswerList'

const AnswersCheckTeacher = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <section className='answers-check'>
      <div className="answers-check__container container container--smaller">
        <div className='answer-check__wrapper'>
          <a href="" className="back-link">
            <svg width="187" height="55" viewBox="0 0 187 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.7451 5.9399C11.3153 2.6184 14.6599 0.5 18.3338 0.5H177C182.247 0.5 186.5 4.7533 186.5 10V45C186.5 50.2467 182.247 54.5 177 54.5H18.3338C14.6599 54.5 11.3153 52.3816 9.7451 49.0601L1.47238 31.5601C0.257292 28.9897 0.257292 26.0103 1.47238 23.4399L5.95204 13.9637L9.7451 5.9399Z" stroke="#0050CF" />
            </svg>
            <span className="back-link__text">Экзамены</span>
          </a>
          <div className='answers-check__student answers-check__student--no-checking'>4</div>
        </div>
        <div className="answers-check__body">
          <h1 className='answers-check__title title'>Дополнительные главы математического анализа</h1>
          <div className="answers-check__data data">
            <span className='data__stage'>1 курс 3 группа</span>
            <span className='data__department'>Фундаментальная физика</span>
          </div>
          <AnswerList />
          <Button onClick={() => setModalActive(true)}>Закончить проверку</Button>
          <Popup active={modalActive} setActive={setModalActive}>
            <h2 className="popup__title title">Вы действительно хотите закончить проверку?</h2>
            <div className="confirm-buttons">
              <Button className="confirm-button confirm-button--yes"><span>Да</span></Button>
              <Button className="confirm-button confirm-button--no" onClick={() => setModalActive(false)}>Нет</Button>
            </div>
          </Popup>
        </div>
      </div>
    </section>
  )
}

export default AnswersCheckTeacher