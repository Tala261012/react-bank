const express = require('express')
const router = express.Router()

// ========================================================================

const { Bank } = require('../class/bank')
const { Session } = require('../class/session')
const { Notification } = require('../class/notification')
const { Balance } = require('../class/balance')

// ========================================================================

router.get('/balance', function (req, res) {
  const { token } = req.query

  // console.log(token)

  if (!token) {
    return res.status(400).json({
      message: 'Ошибка! Такой token не существует.',
    })
  }

  try {
    const sum = Bank.getSum(token)

    console.log(sum)

    if (!sum) {
      return res.status(400).json({
        message:
          'Ошибка! Нет данных о суммен на счету пользователя.',
      })
    }

    return res.status(200).json({
      message: 'Данные получены.',
      sum,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.post('/balance-receive', function (req, res) {
  const { token, type, address, cash } = req.body

  if (!token || !type || !address || !cash) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют.',
    })
  }

  try {
    const session = Session.getByToken(token)

    if (!session) {
      return res.status(400).json({
        message: 'Ошибка сессии.',
      })
    }

    const notification = Notification.create(token, type)

    const newBalance = Balance.create(
      token,
      notification.date,
      type,
      address,
      cash,
    )

    const bank = Bank.getElemByToken(token)

    bank.sum += cash

    return res.status(200).json({
      message: 'Успешный перевод средств на ваш счет.',
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

module.exports = router
