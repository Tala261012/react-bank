const express = require('express')
const router = express.Router()

// ==================================================

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

// ==================================================

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

    User.create(email, password)

    // console.log(user)

    return res
      .status(200)
      .json({ message: 'Пользователь успешно создан' })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Ошибка создания пользователя' })
  }
})

// ==================================================

router.get('/signup', function (req, res) {
  const list = User.getList()
  return res.status(200).json(list)
})

// ==================================================

router.get('/recovery', function (req, res) {
  const list = Confirm.getList()
  return res.status(200).json(list)
})

// ==================================================

router.post('/recovery', function (req, res) {
  try {
    const { email } = req.body

    console.log(email)

    if (!email) {
      return res.status(400).json({
        message:
          'Ошибка! Не все обязательные поля заполнены.',
      })
    }

    const user = User.getByEmail(email)
    console.log(user)

    if (!user) {
      return res.status(400).json({
        message: `Пользователь с таким email (${email}) не найден.`,
      })
    }

    const confirm = Confirm.create(user.email)

    // отправка на email...

    console.log(confirm)

    return res.status(200).json({
      message: `Код для восстановления пароля успешно отправлен на email. (${confirm.code})`,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Ошибка отправки кода.' })
  }
})

module.exports = router
