// var dotenv = require('dotenv').config()
var TelegramBot = require('node-telegram-bot-api')

var TOKEN = process.env.TELEGRAM_BOT_TOKEN

var bot = new TelegramBot(TOKEN, { polling: false })

var GAME_SHORT_NAME = 'rainbowrex'

function sendGame (event, lambdaCallback) {
  bot.sendGame(
    event.body.message.from.id,
    GAME_SHORT_NAME
  ).then(function () {
    lambdaCallback(null, '')
  }).catch(function (error) {
    console.log(error)
  })
}

function startGame (event, lambdaCallback) {
  var cq = event.body.callback_query
  console.log(event.body.callback_query)
  var msgId = cq.message.message_id
  var chatId = cq.message.chat.id
  var userId = cq.from.id
  var gameUrlWithParams = 'https://rainbowrex.surge.sh/?userId=' + userId + '&chatId=' + chatId + '&msgId=' + msgId

  if (cq.game_short_name && cq.game_short_name === GAME_SHORT_NAME) {
    bot.answerCallbackQuery(
      cq.id,
      undefined,
      false,
      { url: gameUrlWithParams }
    ).then(function () {
      lambdaCallback(null, '')
    }).catch(function (error) {
      console.log(error)
    })
  } else {
    bot.answerCallbackQuery(
      cq.id,
      "Sorry, '" + cq.game_short_name + "' is not available.", true
    ).then(function () {
      lambdaCallback(null, '')
    }).catch(function (error) {
      console.log(error)
    })
  }
}

exports.handler = function (event, context, lambdaCallback) {
  if (event.body.message) sendGame(event, lambdaCallback)
  if (event.body.callback_query) startGame(event, lambdaCallback)
}
