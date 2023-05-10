import { useState } from 'react'
import Button from '../ui/Button'
import TextArea from '../ui/TextArea'
import Input from '../ui/Input'

const QuestionItem = ({ question, answer, setAnswer, onSave, onEdit, isLoading }) => {
  const [textAnswer, setTextAnswer] = useState(answer ? answer : '')
  console.log(answer)
  return (
    <li className='questions__item questions-item'>
        <span className='questions-item__number'>Вопрос №{question.number}</span>
        <div className="questions-item__body">
            <div className="questions-item__inner">
                <p className="questions-item__text">
                    {question.text}
                </p>
                <TextArea onChange={(evt) => setTextAnswer(evt.target.value)} className='questions-item__answer-text' defaultValue={textAnswer} />
            </div>
            {
              answer != ''
                ? <Button onClick={() => { onSave(textAnswer) }} className={`questions-item__btn questions-item__btn--save${isLoading ? ' loading' : ''}`}><span>Сохранить</span></Button>
                : <Button onClick={() => { onEdit(textAnswer) }} className={`questions-item__btn questions-item__btn--edit${isLoading ? ' loading' : ''}`}><span>Редактировать</span></Button>
            }
        </div>
    </li>
  )
}

export default QuestionItem