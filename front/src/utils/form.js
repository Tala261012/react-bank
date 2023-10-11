const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);

const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

// в этом объекте будут все данные одного пользователя
export class SignupForm {
  static FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
    PASSWORD_CONFIRM: "passwordConfirm",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    EMAIL: "Введите корректное значение e-mail адреса",
    PASSWORD:
      "Пароль должен состоять не менее, чем из 8 символов, включая хотя бы одну цифру, строчную и заглавную букву.",
    PASSWORD_CONFIRM: "Ваш второй пароль не совпадает с первым.",
  };

  static error = {}; // объект с ошибками
  static value = {}; // объект со значениями

  static validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG;
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
    }

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD;
      }
    }

    if (name === this.FIELD_NAME.PASSWORD_CONFIRM) {
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

  static validateAll = () => {
    Object.entries(this.value).forEach(([name, value]) => {
      const error = this.validate(name, value);

      if (error) {
        this.error[name] = error;
      } else {
        delete this.error[name];
      }
    });

    if (this.value.password !== this.value.passwordConfirm) {
      this.error["passwordConfirm"] = this.FIELD_ERROR.PASSWORD_CONFIRM;
    }
  };

  static convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
    });
  };
}

// module.exports = { SignupForm };
