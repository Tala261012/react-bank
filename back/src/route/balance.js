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

    // console.log(sum)

    if (!sum) {
      return res.status(400).json({
        message:
          'Ошибка! Нет данных о суммен на счету пользователя.',
      })
    }

    return res.status(200).json({
      message: 'Доступная сумма успешно получена.',
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

router.get('/balance-list', function (req, res) {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют.',
    })
  }

  try {
    const list = Balance.getByToken(token)

    if (!list) {
      return res.status(400).json({
        message:
          'Ошибка! Нет данных о переводах пользователя.',
      })
    }

    return res.status(200).json({
      message: 'Данные о переводах получены.',
      list,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.post('/balance-send', function (req, res) {
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

    const bank = Bank.getElemByToken(token)

    if (bank.sum < cash) {
      return res.status(400).json({
        message: 'Недостаточно средств на счету.',
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

    bank.sum -= cash

    //-------------------------------------------------------------------
    const receiverSession = Session.getByEmail(address)

    if (receiverSession) {
      const receiverNotification = Notification.create(
        receiverSession.token,
        'GET_MONEY',
      )

      const receiverBalance = Balance.create(
        receiverSession.token,
        receiverNotification.date,
        'GET_MONEY',
        session.user.email,
        cash,
      )

      const receiverBank = Bank.getElemByToken(
        receiverSession.token,
      )

      receiverBank.sum += cash
    }
    //-------------------------------------------------------------------

    return res.status(200).json({
      message: `Успешный перевод средств на счет ${address}.`,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.get('/transaction', function (req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      message: 'Ошибка. Обязательные поля отсутствуют.',
    })
  }

  try {
    const transaction = Balance.getById(Number(id))

    if (!transaction) {
      return res.status(400).json({
        message: 'Ошибка транзакции.',
      })
    }

    return res.status(200).json({
      message: `Данные получены.`,
      transaction,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// ========================================================================

router.get('/bal', function (req, res) {
  const list = Balance.getList()
  return res.status(200).json(list)
})

// ========================================================================

module.exports = router
