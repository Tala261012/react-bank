// изменить стили поля на error и сообщить об ошибке
export function setError(tempClass, key, stateFunction, refName) {
  if (tempClass.error.hasOwnProperty(key)) {
    stateFunction(true);

    refName.current.classList.toggle("form__error--active", true);
    refName.current.innerText = tempClass.error[key];
  } else {
    stateFunction(false);
    refName.current.classList.toggle("form__error--active", false);
  }
}

//получить короткое время - часы:минуты
export const getDateShort = (time) => {
  const date = new Date(time);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${hours}:${minutes}`;

  return formattedDate;
};

//получить время в формате - день месяц(текст), часы:минуты
const getStrMonth = (month) => {
  switch (month) {
    default:
      return "";
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
};

export const getDate = (time) => {
  const date = new Date(time);

  const day = date.getDate().toString().padStart(2, "0");
  const month = getStrMonth(date.getMonth());
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day} ${month}, ${hours}:${minutes}`;

  return formattedDate;
};

//получить сколько времени прошло от настоящего момента
export const getDateAgo = (time) => {
  const disparity = new Date().getTime() - time;

  const minutes = Math.floor(disparity / 1000 / 60); // кол-во минут

  if (minutes < 60) {
    return `${minutes} min. ago`;
  } else {
    const hours = minutes / 60; // кол-во часов с десятичной частью

    if (hours >= 24) {
      return getDate(time);
    } else {
      const hoursRes = Math.floor(hours);
      const rest = hours - hoursRes;
      const minRes = Math.floor(rest * 60);

      return `${hoursRes} h. ${minRes} min. ago`;
    }
  }
};
