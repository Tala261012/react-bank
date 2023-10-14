// класс для создания, хранения кодов и почт при смене пароля по коду
class Session {
  static #list = []

  constructor(user) {
    this.token = Session.generateCode()
    this.user = {
      email: user.email,
      isConfirm: user.isConfirm,
    }
  }

  static create = (user) => {
    const session = new Session(user)
    this.#list.push(session)

    return session
  }

  static generateCode = () => {
    const length = 6 // длинна токена
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      result += characters[randomIndex]
    }

    return result
  }

  static getByToken = (token) => {
    // возвращает весь объект {user, token}
    return (
      this.#list.find((elem) => elem.token === token) ||
      null
    )
  }

  static deleteByToken = (token) => {
    // в случае удаления аккаунта
    this.#list = this.#list.filter(
      (elem) => elem.token !== token,
    )
  }

  static getList = () => {
    return this.#list
  }
}

module.exports = { Session }
