const Discord = require('discord.js')
const auth = require('./auth.json')
const bot = new Discord.Client()
const googleTranslate = require('google-translate')(auth.googleAPIKey)
const parser = require('discord-command-parser')
const prefix = '!'
const languages = ['zh', 'ja']
const MAX_CONTENT_LENGTH = 200

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
  let targetLanguage
  let content
  const parsed = parser.parse(msg, prefix, {
    allowBots: false,
    allowSelf: false
  })
  if (!parsed.success) {
    // stop process non-command messages.
    // console.log(parsed.error)
    return
  }
  if ( !parsed.body.length || (languages.includes(parsed.arguments[0].toLowerCase()) && !parsed.arguments[1])) {
    // stop process if sentence is empty.
    return
  }
  // console.info(`Called command: ${parsed.command}, arguments ${parsed.arguments.length}`)
  switch (parsed.command) {
    case '翻譯':
      targetLanguage = languages.includes(parsed.arguments[0].toLowerCase()) ? parsed.arguments[0].toLowerCase() : 'ja'
      targetLanguage = targetLanguage === 'zh' ? 'zh-TW' : targetLanguage // force translate to chinese tradition.
      content = languages.includes(parsed.arguments[0].toLowerCase()) ? parsed.body.replace(parsed.arguments[0] + ' ', '') : parsed.body
      if (content.length > MAX_CONTENT_LENGTH) {
        // stop translation if sentence is too long.
        msg.channel.send(`${msg.author.username} 話太多無法處理喵`)
        return
      }
      googleTranslate.translate(content, targetLanguage, function(err, translation) {
        if (err) {
          msg.channel.send(`${msg.author.username} 翻譯發生錯誤喵`)
        } else {
          msg.channel.send(translation.translatedText)
        }
      })
      break
    case '翻訳':
      targetLanguage = languages.includes(parsed.arguments[0].toLowerCase()) ? parsed.arguments[0].toLowerCase() : 'zh'
      targetLanguage = targetLanguage === 'zh' ? 'zh-TW' : targetLanguage // force translate to chinese tradition.
      content = languages.includes(parsed.arguments[0].toLowerCase()) ? parsed.body.replace(parsed.arguments[0] + ' ', '') : parsed.body
      if (content.length > MAX_CONTENT_LENGTH) {
        // stop translation if sentence is too long.
        msg.channel.send(`${msg.author.username} 申し訳ありません，翻訳するコンテンツが多すぎます`)
        return
      }
      googleTranslate.translate(content, targetLanguage, function(err, translation) {
        if (err) {
          msg.channel.send(`${msg.author.username} 申し訳ありません，翻訳エラーが発生しました`)
        } else {
          msg.channel.send(translation.translatedText)
        }
      })
      break
    default:
      return
  }
})

bot.login(auth.discordToken)
