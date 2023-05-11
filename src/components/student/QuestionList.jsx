import { useState } from 'react'
import { useFetching } from '../../hooks/useFetching'
import QuestionItem from './QuestionItem'
import AnswerService from '../../api/AnswerService'

const QuestionList = ({ examenAnswers, questions, studentId, answerBlankId }) => {
  const [questionIdLoading, setQuestionLoadingId] = useState(null)

  const [createAnswer, isAnswerLoading, ansError] = useFetching(async (answer) => {
    const response = await AnswerService.createAnswer(answer)

    if (response.status == 200) {
      alert("Ответ принят!")
    } else {
      console.log(ansError)
    }
  })

  const [editAnswer, isEditAnswerLoading, ansEditError] = useFetching(async (answer) => {
    const response = await AnswerService.editAnswer(answer)

    if (response.status == 200) {
      alert("Ответ принят!")
    } else {
      console.log(ansError)
    }
  })

  const getAnswerQuestionById = (id) => {
    if (examenAnswers) {
      console.log(examenAnswers)
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

  const onSaveAnswer = (questionId, textAnswer) => {
    createAnswer({
      id: 0,
      studentId: studentId,
      questionId: questionId,
      answerBlankId: answerBlankId,
      textAnswer: textAnswer,
      createAnswerDate: new Date(),
      updateAnswerDate: null,
      isDeleted: false
    })
  }

  const onEditAnswer = (questionId, textAnswer) => {
    const answer = examenAnswers.find(e => e.questionId == questionId)
    answer.textAnswer = textAnswer
    editAnswer(answer)
  }
    
    
  return (
    <ul className='questions__list'>
      {
        questions.map(question =>
          <QuestionItem 
              onSave={(textAnswer) => {
                onSaveAnswer(question.id, textAnswer)
              }} 
              onEdit={(textAns) => {
                onEditAnswer(question.id, textAns)
              }}
              key={question.id} 
              question={question} 
              answer={getAnswerQuestionById(question.id)} 
              isLoading={isAnswerLoading} 
            />
        )
      }
  </ul>
  )
}

export default QuestionList