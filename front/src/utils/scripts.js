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
