// класс для создания, хранения кодов и почт при смене пароля по коду
// код удаляется после использования
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

  static getByCode = (code) => {
    return (
      this.#list.find((elem) => elem.code === code) || null
    )
  }

  static deleteByEmail = (email) => {
    this.#list = this.#list.filter(
      (elem) => elem.email !== email,
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
