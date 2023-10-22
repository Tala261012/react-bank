class Bank {
  static #list = []

  constructor(token) {
    this.token = token
    this.sum = 1000
  }

  static create = (token) => {
    const newAccount = new Bank(token)
    this.#list.push(newAccount)

    return newAccount
  }

  static getElemByToken = (token) => {
    return this.#list.find((item) => item.token === token)
  }

  static getSum = (token) => {
    const account = this.#list.find(
      (item) => item.token === token,
    )
    return account.sum
  }

  static setSum = (token, sum) => {
    const account = this.#list.find(
      (item) => item.token === token,
    )
    account.sum = sum
  }
}

module.exports = { Bank }
