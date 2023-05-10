import { useState } from 'react'
import { useFetching } from '../../hooks/useFetching'
import QuestionItem from './QuestionItem'
import AnswerService from '../../api/AnswerService'

const QuestionList = ({ examenAnswers, questions, studentId, answerBlankId }) => {
  const [currentAnswerText, setCurrentAnswerText] = useState(null)

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
    if (examenAnswers != null) {
      console.log(examenAnswers)
      let textAnswer = examenAnswers.find(ans => ans.questionId == id)?.textAnswer
      return textAnswer
    } else {
      return ''
    }
  } 
    
    
  return (
    <ul className='questions__list'>
      {
        questions.map(question =>
          <QuestionItem 
              onSave={(textAnswer) => {
                console.log(textAnswer)
                createAnswer({
                  id: 0,
                  studentId: studentId,
                  questionId: question.id,
                  answerBlankId: answerBlankId,
                  textAnswer: textAnswer,
                  createAnswerDate: new Date(),
                  updateAnswerDate: null,
                  isDeleted: false
                })
              }} 
              onEdit={(textAns) => {
                console.log("Текст ответа: " + textAns)
              }}
              key={question.id} 
              question={question} 
              answer={getAnswerQuestionById(question.id)} 
              isLoading={isAnswerLoading} 
              setAnswer={setCurrentAnswerText} 
            />
        )
      }
  </ul>
  )
}

export default QuestionList