import Input from '../ui/Input'
import Button from '../ui/Button'

const QuestionItem = ({ question }) => {
  return (
    <li className='questions__item questions-item'>
        <span className='questions-item__number'>Вопрос №{question.number}</span>
        <div className="questions-item__body">
            <div className="questions-item__inner">
                <p className="questions-item__text">
                    {question.text}
                </p>
                <Input className='questions-item__answer-text' />
            </div>
            <Button className='questions-item__btn questions-item__btn--save'>Сохранить</Button>
        </div>
    </li>
  )
}

export default QuestionItem