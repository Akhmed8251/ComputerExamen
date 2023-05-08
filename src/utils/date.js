export const formatDate = (date) => {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
}

export const diffBetweenDatesInSeconds = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffSeconds = Math.ceil(diffTime / (1000 * 60)); 
    return diffSeconds
}

export const diffBetweenDatesInDays = (date1, date2) => {
    const diffTime = date1 - date2;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
}