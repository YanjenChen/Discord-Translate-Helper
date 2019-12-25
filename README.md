# Discord Translate Helper

簡單易懂的Discord翻譯小助手。

## Getting Started

1. `yarn install`或`npm install` 安裝相依套件
2. 修改`auth.example.json`填入discord bot token和google cloud platform API key.
3. 重新命名`auth.example.json`為`auth.json`
4. `node app.js`運行BOT.

### Google cloud platform API取得方式

1. 註冊[google cloud platform](https://cloud.google.com/?hl=zh-tw)並取得免費試用額度
2. 參考[這篇教學](https://www.nodejsera.com/how-to-use-google-translator-with-nodejs.html)設定並取得GCP API Key (建議同時設定API Key的使用限制增加安全性)

## BOT command example

```
!翻譯 今天的晚餐吃什麼
!翻譯 zh 今日のランチは何ですか
!翻訳 今日のランチは何ですか
!翻訳 ja 今天的晚餐吃什麼
```

## Authors

* **sTicK_FiguRe** - *Initial work* - [YJ Chen](https://github.com/YanjenChen)

## License

This project is licensed under the MIT License
