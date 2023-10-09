const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);

const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

// в этом объекте будут все данные одного пользователя
export class SignupForm {
  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    EMAIL: "Введите корректное значение e-mail адреса",
    PASSWORD:
      "Пароль должен состоять не менее, чем из 8 символов, включая хотя бы одну цифру, строчную и заглавную букву.",
    PASSWORD_CONFIRM: "Ваш второй пароль не совпадает с первым.",
  };

  static error = {};
  static value = {};

  static validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG;
    }

    if (name === "email") {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
    }

    if (name === "password") {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD;
      }
    }

    if (name === "passwordConfirm") {
      if (String(value) !== this.value["password"]) {
        return this.FIELD_ERROR.PASSWORD_CONFIRM;
      }
    }
  };

  static change = (name, value) => {
    const error = this.validate(name, value);
    this.value[name] = value;

    if (error) {
      this.error[name] = error;
    } else {
      delete this.error[name];
    }

    console.log(this.error);
    console.log(this.value);
  };

  static submit = () => {
    //отправка на сервер - нажатие кнопки
    alert();
  };
}

// module.exports = { SignupForm };
