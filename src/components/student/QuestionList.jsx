import { useRef, useState } from 'react'
import { useFetching } from '../../hooks/useFetching'
import QuestionItem from './QuestionItem'
import AnswerService from '../../api/AnswerService'
import Button from '../ui/Button'
import AnswerBlankService from '../../api/AnswerBlankService'

const QuestionList = ({onUpdate, examenAnswers, questions, studentId, answerBlank, isStop }) => {
  const [questionIdLoading, setQuestionLoadingId] = useState(null)
  const questionItems = useRef([])

  const getAnswerQuestionById = (id) => {
    if (examenAnswers) {
      let textAnswer = examenAnswers.find(ans => ans.questionId == id)?.textAnswer
      if (textAnswer != null) {
        return textAnswer
      } else {
        return ''
      } 
    } else {
      return ''
    }
  }     
    
  return (
    <>
      <ul className='questions__list'>
        {
          questions.map(question =>
            <QuestionItem 
              key={question.id} 
              question={question} 
              answer={getAnswerQuestionById(question.id)} 
            />
          )
        }
      </ul>
    </>
  )
}

export default QuestionList