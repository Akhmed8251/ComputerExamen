const StudentScoreList = () => {
  return (
    <ul className='examen-results__list'>
        <li className="examen-results__item result-item">
            <p className="result-item__fio">Носова Елена Андреевна</p>
            <p className="result-item__score result-item__score--success">93</p>
        </li>
        <li className="examen-results__item result-item">
            <p className="result-item__fio">Еремина Кира Никитична</p>
            <p className="result-item__score result-item__score--success">72</p>
        </li>
        <li className="examen-results__item result-item">
            <p className="result-item__fio">Карасева Арина Максимовна</p>
            <p className="result-item__score result-item__score--failed">21</p>
        </li>
        <li className="examen-results__item result-item">
            <p className="result-item__fio">Зайцева Аврора Артёмовна</p>
            <p className="result-item__score--missing">Не явился</p>
        </li>
    </ul>
  )
}

export default StudentScoreList