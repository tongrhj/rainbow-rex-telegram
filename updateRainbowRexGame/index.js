var TelegramBot = require('node-telegram-bot-api')

var TOKEN = process.env.TELEGRAM_BOT_TOKEN

var bot = new TelegramBot(TOKEN, { polling: false })

var GAME_SHORT_NAME = 'rainbowrex'

function updateScore (event, lambdaCallback) {
  var _event = event
  var user_id = _event.userId
  var chat_id = _event.chatId
  var message_id = _event.msgId
  var score = _event.score

  bot.setGameScore(user_id, score, {
    chat_id: chat_id,
    message_id: message_id
  }).then(function () {
    lambdaCallback(null, '')
  }).catch(function (error) {
    console.log(error)
  })
}

exports.handler = function (event, context, lambdaCallback) {
  if (event) updateScore(event, lambdaCallback)
}
