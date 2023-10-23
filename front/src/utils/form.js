const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);

const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[a-zA-Zа-яА-Я]).{8,}$/
);

const REG_EXP_CASH = new RegExp(/^[^-]*$/);

// ======================================================================================

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

// ======================================================================================

// отправка кода на почту
export class RecoveryForm {
  static FIELD_NAME = {
    EMAIL: "email",
  };

  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    EMAIL: "Введите корректное значение e-mail адреса",
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
  };

  static change = (name, value) => {
    const error = this.validate(name, value);
    this.value[name] = value;

    if (error) {
      this.error[name] = error;
    } else {
      delete this.error[name];
    }
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
  };

  static convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
    });
  };
}

// ======================================================================================

// смена пароля по коду
export class RecoveryConfirmForm {
  static FIELD_NAME = {
    EMAIL: "email",
    CODE: "code",
    PASSWORD: "password",
    PASSWORD_CONFIRM: "passwordConfirm",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
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

  static setEmail = (email) => {
    this.value.email = String(email).toLowerCase();
  };

  static convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
      [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
    });
  };
}

// ======================================================================================

// смена пароля по коду
export class EmailConfirmForm {
  static FIELD_NAME = {
    EMAIL: "email",
    CODE: "code",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
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
  };

  static change = (name, value) => {
    const error = this.validate(name, value);
    this.value[name] = value;

    if (error) {
      this.error[name] = error;
    } else {
      delete this.error[name];
    }
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
  };

  static setEmail = (email) => {
    this.value.email = String(email).toLowerCase();
  };

  static convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
    });
  };
}

// ======================================================================================

export class SigninForm {
  static FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    EMAIL: "Введите корректное значение e-mail адреса",
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
  };

  static change = (name, value) => {
    const error = this.validate(name, value);
    this.value[name] = value;

    if (error) {
      this.error[name] = error;
    } else {
      delete this.error[name];
    }
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
  };

  static convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
    });
  };
}

// ======================================================================================

export class SettingsEmailForm {
  static FIELD_NAME = {
    OLD_EMAIL: "old_email",
    NEW_EMAIL: "new_email",
    PASSWORD: "password",
    TOKEN: "token",
    ACTION_TYPE: "type",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    EMAIL: "Введите корректное значение e-mail адреса",
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

    if (name === this.FIELD_NAME.NEW_EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
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
  };

  static setToken = (token) => {
    this.value[this.FIELD_NAME.TOKEN] = token;
  };

  static convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.TOKEN]: this.value[this.FIELD_NAME.TOKEN],
      [this.FIELD_NAME.ACTION_TYPE]: "EMAIL_CHANGE",
      [this.FIELD_NAME.NEW_EMAIL]: this.value[this.FIELD_NAME.NEW_EMAIL],
      [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
    });
  };
}

// ======================================================================================

export class SettingsPasswordForm {
  static FIELD_NAME = {
    OLD_PASSWORD: "old_password",
    NEW_PASSWORD: "new_password",
    TOKEN: "token",
    ACTION_TYPE: "type",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    NEW_PASSWORD:
      "Пароль должен состоять не менее, чем из 8 символов, включая хотя бы одну цифру, строчную и заглавную букву.",
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

    if (name === this.FIELD_NAME.NEW_PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.NEW_PASSWORD;
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
  };

  static setToken = (token) => {
    this.value[this.FIELD_NAME.TOKEN] = token;
  };

  static convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.TOKEN]: this.value[this.FIELD_NAME.TOKEN],
      [this.FIELD_NAME.ACTION_TYPE]: "PASSWORD_CHANGE",
      [this.FIELD_NAME.OLD_PASSWORD]: this.value[this.FIELD_NAME.OLD_PASSWORD],
      [this.FIELD_NAME.NEW_PASSWORD]: this.value[this.FIELD_NAME.NEW_PASSWORD],
    });
  };
}

// ======================================================================================

// ======================================================================================

// Пополнить свой счет
export class BalanceReceiveForm {
  static FIELD_NAME = {
    TOKEN: "token",
    TYPE: "type",
    ADDRESS: "address",
    CASH: "cash",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    CASH: "Некорректное значение.",
  };

  static error = {}; // объект с ошибками
  static value = {}; // объект со значениями

  static validate = (name, value) => {
    if (name === this.FIELD_NAME.CASH) {
      if (!REG_EXP_CASH.test(String(value))) {
        return this.FIELD_ERROR.CASH;
      }
    }

    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG;
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
  };

  static setToken = (token) => {
    this.value[this.FIELD_NAME.TOKEN] = token;
  };

  static setAddress = (address) => {
    this.value[this.FIELD_NAME.ADDRESS] = String(address);
  };

  static convertData = () => {
    this.value[this.FIELD_NAME.TYPE] = "GET_MONEY";

    return JSON.stringify({
      [this.FIELD_NAME.TOKEN]: this.value[this.FIELD_NAME.TOKEN],
      [this.FIELD_NAME.TYPE]: this.value[this.FIELD_NAME.TYPE],
      [this.FIELD_NAME.ADDRESS]: this.value[this.FIELD_NAME.ADDRESS],
      [this.FIELD_NAME.CASH]: Number(this.value[this.FIELD_NAME.CASH]),
    });
  };
}

// ======================================================================================

// ======================================================================================

// перевод по email
export class BalanceSendForm {
  static FIELD_NAME = {
    TOKEN: "token",
    TYPE: "type",
    ADDRESS: "address", // тут это email
    CASH: "cash",
  };

  // тут - заготовленные тексты на случай ошибок при валидации
  static FIELD_ERROR = {
    IS_EMPTY: "Введите значение в поле",
    IS_BIG: "Слишком длинное значение, уберите лишнее",
    CASH: "Некорректное значение.",
    EMAIL: "Введите корректное значение e-mail адреса",
  };

  static error = {}; // объект с ошибками
  static value = {}; // объект со значениями

  static validate = (name, value) => {
    if (name === this.FIELD_NAME.CASH) {
      if (!REG_EXP_CASH.test(String(value))) {
        return this.FIELD_ERROR.CASH;
      }
    }

    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG;
    }

    if (name === this.FIELD_NAME.ADDRESS) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
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
  };

  static setToken = (token) => {
    this.value[this.FIELD_NAME.TOKEN] = token;
  };

  static convertData = () => {
    this.value[this.FIELD_NAME.TYPE] = "SEND_MONEY";

    return JSON.stringify({
      [this.FIELD_NAME.TOKEN]: this.value[this.FIELD_NAME.TOKEN],
      [this.FIELD_NAME.TYPE]: this.value[this.FIELD_NAME.TYPE],
      [this.FIELD_NAME.ADDRESS]: String(
        this.value[this.FIELD_NAME.ADDRESS]
      ).toLowerCase(),
      [this.FIELD_NAME.CASH]: Number(this.value[this.FIELD_NAME.CASH]),
    });
  };
}

// ======================================================================================
