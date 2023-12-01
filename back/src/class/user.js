class User {
  // список пользователей
  static #list = []
  // для генерации id
  static #count = 1

  constructor(name, email, password) {
    this.id = User.#count++
    this.name = name
    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.isConfirm = false
  }

  static create(name, email, password) {
    const newUser = new User(name, email, password)
    this.#list.push(newUser)

    return newUser
  }

  static getByEmail = (email) => {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null
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
