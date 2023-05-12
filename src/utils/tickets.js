export const parsingExamTicket = (ticketsFromTextArea, ticketsEdit = null) => {
    let ticketsArr = ticketsFromTextArea.split("\n\n")
    let tickets = []

    ticketsArr.forEach(ticket => {
      const ticketData = ticket.split("\n")
      const ticketNumber = parseInt(ticketData[0].split("№")[1])
      const ticketQuestions = ticketData.splice(1, ticketData.length - 1)
      
      let questionsItems = []
      ticketQuestions.forEach(question => {
        const questionData = question.split(" - ")
        const numberQuestion = parseInt(questionData[0].substring(1))
        const questionText = questionData[1]
        
        let questionObj = {
            id: 0,
            examTicketId: 0,
            number: numberQuestion,
            text: questionText,
            isDeleted: false
        }

        questionsItems.push(questionObj)
      })

      let ticketObj = {
        id: 0,
        number: ticketNumber,
        examenId: 0,
        questions: questionsItems,
        isDeleted: false
      }

      tickets.push(ticketObj)
    })

    return tickets
}

export const getTicketsForInput = (tickets) => {
  let ticketsRes = []

  tickets.forEach(ticket => {
    let ticketStr = `Билет №${ticket.number}\n`
    let questions = []

    ticket.questions.forEach(question => {
      let questionStr = `№${question.number} - ${question.text}`
      questions.push(questionStr)
    })

    ticketStr += questions.join("\n")
    ticketsRes.push(ticketStr)
  })

  return ticketsRes.join("\n\n")
}