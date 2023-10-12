// класс для создания, хранения кодов и почт при смене пароля по коду
class Confirm {
  static #list = []

  constructor(email) {
    this.email = email
    this.code = Confirm.generateCode()
  }

  static create = (email) => {
    const newElem = new Confirm(email)
    this.#list.push(newElem)

    return newElem

    // setTimeout(() => {
    //   this.deleteByCode(newElem.code)
    // }, 1000 * 60 * 60 * 24) // удалить через сутки
  }

  static generateCode = () => {
    return Math.trunc(Math.random() * 9000) + 1000
  }

  static checkCode = (email, code) => {
    // сравниваем код с почтой
    const elemByCode = this.getByCode(code)

    if (elemByCode) {
      if (elemByCode.email === email) {
        return true //код сооветствует почте
      } else return false
    } else return false
  }

  static getByCode = (code) => {
    return (
      this.#list.find((elem) => elem.code === code) || null
    )
  }

  static deleteByCode = (code) => {
    this.#list = this.#list.filter(
      (elem) => elem.code !== code,
    )
  }

  static getList = () => {
    return this.#list
  }
}

module.exports = { Confirm }
