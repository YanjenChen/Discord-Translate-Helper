const Discord = require('discord.js')
const auth = require('./auth.json')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const googleTranslate = require('google-translate')(auth.googleAPIKey)

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase()
  const content = args.shift()
  console.info(`Called command: ${command}, content ${content}`)

  if (content) {
    switch (command) {
      case '!翻譯':
        googleTranslate.translate(content, 'ja', function(err, translation) {
          if (err) {
            msg.channel.send(`${msg.author.username} 翻譯發生錯誤喵`)
          } else {
            msg.channel.send(translation.translatedText)
          }
        })
        break
      case '!翻訳':
        googleTranslate.translate(content, 'zh', function(err, translation) {
          if (err) {
            msg.channel.send(`${msg.author.username} 申し訳ありません エラーが発生しました`)
          } else {
            msg.channel.send(translation.translatedText)
          }
        })
        break
      default:
        return
    }
  }
})

bot.login(auth.discordToken)
