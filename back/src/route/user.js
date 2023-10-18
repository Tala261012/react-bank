const express = require('express')
const router = express.Router()

// ========================================================================

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

// ========================================================================

router.post('/signup', function (req, res) {
  try {
    const { email, password } = req.body

    // console.log(email, password)

    if (!email || !password) {
      return res.status(400).json({
        message:
          'Ошибка! Не все обязательные поля заполнены.',
      })
    }

    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: `Пользователь с таким email (${email}) уже существует.`,
      })
    }

    const newUser = User.create(email, password)

    console.log(newUser)

    const session = Session.create(newUser)

    const confirm = Confirm.create(newUser.email)

    console.log(confirm.code)

    //confirm email

    return res.status(200).json({
      message:
        'Пользователь успешно создан. На Вашу почту выслан код для подтверждения аккаунта.',
      session,
      code: confirm.code,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Ошибка создания пользователя' })
  }
})

// ========================================================================

router.get('/signup', function (req, res) {
  const list = User.getList()
  return res.status(200).json(list)
})

// ========================================================================

router.get('/recovery', function (req, res) {
  const list = Confirm.getList()
  return res.status(200).json(list)
})

// ========================================================================

router.post('/recovery', function (req, res) {
  try {
    const { email } = req.body

    // console.log(email)

    if (!email) {
      return res.status(400).json({
        message:
          'Ошибка! Не все обязательные поля заполнены.',
      })
    }

    const user = User.getByEmail(email)
    // console.log(user)

    if (!user) {
      return res.status(400).json({
        message: `Пользователь с таким email (${email}) не найден.`,
      })
    }

    const confirm = Confirm.create(user.email)

    // отправка на email...

    console.log(confirm)

    return res.status(200).json({
      message: `Код для восстановления пароля успешно отправлен на email.`,
      code: confirm.code,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Ошибка отправки кода.' })
  }
})

// ========================================================================

router.post('/recovery-confirm', function (req, res) {
  const { password, code, email } = req.body

  console.log(password, code, email)

  if (!password || !code || !email) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют.',
    })
  }

  try {
    const elemByCode = Confirm.getByCode(Number(code))

    if (!elemByCode) {
      return res
        .status(400)
        .json({ message: 'Такого кода нет.' })
    }

    if (elemByCode.email !== String(email)) {
      return res
        .status(400)
        .json({ message: 'Код не сoооветствует.' })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Пользователь с таким email не зарегистрирован.',
      })
    }

    user.password = password

    Confirm.deleteByCode(code)

    console.log(user)

    return res.status(200).json({
      message: 'Пароль изменен.',
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.get('/recovery-confirm', function (req, res) {
  const { renew, email } = req.query

  // console.log('server', renew, email)

  if (!email) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют.',
    })
  }

  try {
    if (renew) {
      Confirm.deleteByEmail(email)

      const confirm = Confirm.create(email)

      console.log(confirm.code)

      return res.status(200).json({
        message: 'Код выслан повторно.',
        code: confirm.code,
      })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.get('/signup-confirm', function (req, res) {
  const { renew, email } = req.query

  // console.log('server', renew, email)

  if (!email) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют.',
    })
  }

  try {
    if (renew) {
      Confirm.deleteByEmail(email)

      const confirm = Confirm.create(email)

      console.log(confirm.code)

      return res.status(200).json({
        message: 'Код выслан повторно.',
        code: confirm.code,
      })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.post('/signup-confirm', function (req, res) {
  const { code, email } = req.body

  console.log(code, email)

  if (!code || !email) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют.',
    })
  }

  try {
    const elemByCode = Confirm.getByCode(Number(code))

    if (!elemByCode) {
      return res
        .status(400)
        .json({ message: 'Такого кода нет.' })
    }

    console.log(elemByCode)

    if (elemByCode.email !== String(email)) {
      return res
        .status(400)
        .json({ message: 'Код не сoооветствует.' })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Пользователь с таким email не зарегистрирован.',
      })
    }

    user.isConfirm = true

    Confirm.deleteByCode(code)

    const session = Session.getByEmail(email)

    if (!session) {
      return res.status(400).json({
        message: 'Ошибка сессии.',
      })
    }

    session.user.isConfirm = true

    // console.log(session)

    return res.status(200).json({
      message: 'Почта подтверждена.',
      session,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.post('/signin', function (req, res) {
  const { email, password } = req.body

  // console.log(email, password)

  if (!email || !password) {
    return res.status(400).json({
      message:
        'Ошибка! Не все обязательные поля заполнены.',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: `Пользователь с таким email (${email}) не зарегистрирован.`,
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: `Неверный пароль.`,
      })
    }

    const session = Session.getByEmail(email)

    if (!session) {
      return res.status(400).json({
        message: 'Ошибка сессии.',
      })
    }

    return res.status(200).json({
      message: 'Вход разрешен.',
      session,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Ошибка входа в аккаунт.' })
  }
})

// ========================================================================

router.post('/settings-email', function (req, res) {
  const {
    token,
    date,
    type,
    old_email,
    new_email,
    password,
  } = req.body

  if (
    !token ||
    !date ||
    !type ||
    !old_email ||
    !new_email ||
    !password
  ) {
    return res.status(400).json({
      message: 'Ошибка! Обязательные поля отсутствуют.',
    })
  }

  try {
    const user = User.getByEmail(old_email)

    if (!user) {
      return res.status(400).json({
        message: `Пользователь с таким email (${old_email}) не зарегистрирован.`,
      })
    }

    if (password !== user.password) {
      return res.status(400).json({
        message: `Пароль неверный.`,
      })
    }

    const session = Session.getByToken(token)

    if (!session) {
      return res.status(400).json({
        message: `Ошибка сессии.`,
      })
    }

    const email = String(new_email).toLowerCase()

    user.email = email
    user.isConfirm = false

    // console.log(user)

    session.user.email = email
    session.user.isConfirm = false

    // console.log(session)

    const confirm = Confirm.create(email)

    // console.log(confirm)

    return res.status(200).json({
      message:
        'Почта успешно изменена. На неё выслан код для подтверждения.',
      session,
      code: confirm.code,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Ошибка смены почты...' })
  }
})

// ========================================================================

module.exports = router
