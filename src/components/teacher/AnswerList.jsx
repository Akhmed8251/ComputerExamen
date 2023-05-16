const AnswerList = ({ questions, answers }) => {
  return (
    <ul className='answers-check__list'>
      {
        questions.map((question, idx) => 
          <li key={question.id} className='answers-check__item answers-item'>
            <div className="answers-item__wrapper">
              <span className='answers-item__number'>Вопрос №{question.number}</span>
              <p className="answers-item__text">
                {question.text}
              </p>
            </div>
            <div className="answers-item__wrapper">
              <span className='answers-item__number answers-item__number-answer'>Ответ №{answers[idx].number}</span>
              <p className="answers-item__text">
                {answers[idx].textAnswer}
              </p>
            </div>
          </li>
        )
      }
    </ul>

  )
}

export default AnswerList