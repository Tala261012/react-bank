class Balance {
  static #list = []
  static #count = 1

  constructor(token, date, type, name, address, cash) {
    this.id = Balance.#count++
    this.token = token
    this.date = date
    this.type = type
    this.name = name
    this.address = address
    this.cash = Number(cash)
  }

  static create = (
    token,
    date,
    type,
    name,
    address,
    cash,
  ) => {
    const newBill = new Balance(
      token,
      date,
      type,
      name,
      address,
      cash,
    )
    this.#list.push(newBill)

    return newBill
  }

  static getByToken = (token) => {
    return this.#list.filter((elem) => elem.token === token)
  }

  static getById = (id) => {
    return this.#list.find((elem) => elem.id === id)
  }

  static getList = () => {
    return this.#list
  }
}

module.exports = { Balance }
