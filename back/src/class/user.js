class User {
  // список пользователей
  static #list = []
  // для генерации id
  static #count = 1

  constructor(email, password) {
    this.id = User.#count++
    this.email = email
    this.password = password
  }

  static create(email, password) {
    const newUser = new User(email, password)
    this.#list.push(newUser)

    return newUser
  }

  static getByEmail = (email) => {
    return (
      this.#list.find((user) => user.email === email) ||
      null
    )
  }

  static getUserById = (id) => {
    return this.#list.find((user) => user.id === id) || null
  }

  static getList = () => {
    return this.#list
  }
}

module.exports = { User }
