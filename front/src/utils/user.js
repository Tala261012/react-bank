class User {
  // список пользователей
  static #list = [];

  constructor({ email, password }) {
    this.email = email;
    this.password = password;
    this.isConfirm = false;
    this.id = Math.trunc(Math.random() * 1000) + 1000;
  }

  static create = (data) => {
    const user = new User(data);
    this.#list.push(user);
  };

  static getUserByEmail = (email) => {
    return this.#list.find((user) => user.email === email) || null;
  };

  static getUserById = (id) => {
    return this.#list.find((user) => user.id === id) || null;
  };
}

module.exports = { User };
