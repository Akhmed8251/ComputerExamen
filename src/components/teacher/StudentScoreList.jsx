const StudentScoreList = ({ scores }) => {
  return (
    <ul className='examen-results__list'>
        {/* <li className="examen-results__item result-item">
            <p className="result-item__fio">Носова Елена Андреевна</p>
            <p className="result-item__score result-item__score--success">93</p>
        </li> */}
        {
            scores.map(student => 
                <li key={student.studentId} className="examen-results__item result-item">
                    <p className="result-item__fio">{`${student.firstName} ${student.lastName} ${student.patr}`}</p>
                    <p className={`${!student.totalScore ? " result-item__score--missing" : student.totalScore >= 51 ? "result-item__score result-item__score--success" : "result-item__score result-item__score--failed"}`}>
                        {student.totalScore != null ? student.totalScore : "Не явился"}
                    </p>
                </li>
            )
        }
        {/* <li className="examen-results__item result-item">
            <p className="result-item__fio">Карасева Арина Максимовна</p>
            <p className="result-item__score result-item__score--failed">21</p>
        </li>
        <li className="examen-results__item result-item">
            <p className="result-item__fio">Зайцева Аврора Артёмовна</p>
            <p className="result-item__score--missing">Не явился</p>
        </li> */}
    </ul>
  )
}

export default StudentScoreList