'use strict'

// var dotenv = require('dotenv').config()
var TelegramBot = require('node-telegram-bot-api')
var dotenv = require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
var TOKEN = process.env.TELEGRAM_BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(TOKEN, { polling: true })

var GAME_SHORT_NAME = 'rainbowrex'

// Matches "/start"
bot.onText(/\/start/, function (msg) {
  bot.sendGame(
    msg.from.id,
    GAME_SHORT_NAME
  )
})

bot.on('callback_query', function(cq) {
  if (cq.game_short_name && cq.game_short_name === GAME_SHORT_NAME) {
    bot.answerCallbackQuery(cq.id, undefined, false, { url: 'https://rainbowrex.surge.sh' })
  } else {
    bot.answerCallbackQuery(cq.id, "Sorry, '" + cq.game_short_name + "' is not available.", true)
  }
})

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function (msg) {
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(msg.chat.id, "console.log(Input received)")
})
