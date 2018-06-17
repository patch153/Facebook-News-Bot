// server.js
// where your node app starts
// init project
var Bot = require('messenger-bot')
var http = require('http')
var request = require('superagent')
var _ = require('lodash')




const bot = new Bot({
    token: process.env.PAGE_TOKEN,
    verify: process.env.VERIFY_TOKEN,
    app_secret: process.env.APP_SECRET
})

const users = {}
bot.on('postback', (payload) => {
    if (payload.postback.payload === 'GET_STARTED_PAYLOAD') {
        const senderId = payload.sender.id

        console.log(senderId)

        bot.getProfile(senderId, (error, profile) => {
            if (error) {
                console.log(error)
            }

            users[senderId] = {
                pageScopedId: senderId,
                firstName: profile.first_name,
                lastName: profile.last_name,
            }

            bot.sendMessage(
                senderId, {
                    text: `Hello ${profile.first_name},  I'm a glitchy news delivery bot!`
                }
            )
            console.log(`${profile.first_name} ${profile.last_name} => users`)
        })
    }
})

bot.on('message', (payload, reply) => {
    const message = payload.message.text;
    const senderId = payload.sender.id;
    
    const newsSites = {
      NYT: {
        names : ["nyt","NYT","Nyt"],
        site : "https://www.nytimes.com/",
        source : "the-new-york-times"
      }, 
      CNN: {
        names : ["cnn","CNN","Cnn"],
        site : "https://www.cnn.com/",
        source : "cnn"
      },
      Bloomberg: {
        names : ["bb","Bloomberg","bloomberg"],
        site : "https://www.bloomberg.com/",
        source : "bloomberg"
      },
      TechCrunch: {
        names : ["techcrunch","Techcrunch","TechCrunch"],
        site : "https://techcrunch.com",
        source : "techcrunch"
      },
      TechRadar: {
        names : ["techradar","Techradar","TechRadar"],
        site : "https://techradar.com",
        source : "techradar"
      },
    };
  

    
    if (message === 'all' || message === 'All' || message === 'ALL' || message === 'headlines' || message === 'Headlines') {
        const NYTUrl = 'https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=52a36d98da214f98a9b9b9bfaba502a7'
        const CNNUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=52a36d98da214f98a9b9b9bfaba502a7'
        const BBUrl = 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=52a36d98da214f98a9b9b9bfaba502a7'
        const TechCrunchUrl = 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=52a36d98da214f98a9b9b9bfaba502a7'
        const TechRadarUrl = 'https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=52a36d98da214f98a9b9b9bfaba502a7'

        var elements = []

        request
            .get(NYTUrl)
            .end((error, result) => {
                const article = result.body.articles[0]
                var element = {
                    "title": article.title,
                    "image_url": article.urlToImage || 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-128.png',
                    //Subtitle limit is 80 characters
                    "subtitle": _.truncate(
                        article.description, {
                            length: 80,
                            separator: '...'
                        }
                    ),
                    "default_action": {
                        "type": "web_url",
                        "url": article.url
                    },
                    "buttons": [{
                        "title": "Read More",
                        "type": "web_url",
                        "url": article.url
                    }]
                }

                elements.push(element)
                // console.log(1)
                request
                    .get(CNNUrl)
                    .end((error, result) => {
                        const article = result.body.articles[0]
                        var element = {
                            "title": article.title,
                            "image_url": article.urlToImage || 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-128.png',
                            //Subtitle limit is 80 characters
                            "subtitle": _.truncate(
                                article.description, {
                                    length: 80,
                                    separator: '...'
                                }
                            ),
                            "default_action": {
                                "type": "web_url",
                                "url": article.url
                            },
                            "buttons": [{
                                "title": "Read More",
                                "type": "web_url",
                                "url": article.url
                            }]
                        }
                        elements.push(element)
                        // console.log(2)

                        request
                            .get(BBUrl)
                            .end((error, result) => {
                                const article = result.body.articles[0]
                                var element = {
                                    "title": article.title,
                                    "image_url": article.urlToImage || 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-128.png',
                                    //Subtitle limit is 80 characters
                                    "subtitle": _.truncate(
                                        article.description, {
                                            length: 80,
                                            separator: '...'
                                        }
                                    ),
                                    "default_action": {
                                        "type": "web_url",
                                        "url": article.url
                                    },
                                    "buttons": [{
                                        "title": "Read More",
                                        "type": "web_url",
                                        "url": article.url
                                    }]
                                }

                                elements.push(element)
                                // console.log(3)

                                request
                                    .get(TechCrunchUrl)
                                    .end((error, result) => {
                                        const article = result.body.articles[0]
                                        var element = {
                                            "title": article.title,
                                            "image_url": article.urlToImage || 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-128.png',
                                            //Subtitle limit is 80 characters
                                            "subtitle": _.truncate(
                                                article.description, {
                                                    length: 80,
                                                    separator: '...'
                                                }
                                            ),
                                            "default_action": {
                                                "type": "web_url",
                                                "url": article.url
                                            },
                                            "buttons": [{
                                                "title": "Read More",
                                                "type": "web_url",
                                                "url": article.url
                                            }]
                                        }

                                        elements.push(element)
                                        // console.log(4)

                                        request
                                            .get(TechRadarUrl)
                                            .end((error, result) => {
                                                const article = result.body.articles[0]
                                                var element = {
                                                    "title": article.title,
                                                    "image_url": article.urlToImage || 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-128.png',
                                                    //Subtitle limit is 80 characters
                                                    "subtitle": _.truncate(
                                                        article.description, {
                                                            length: 80,
                                                            separator: '...'
                                                        }
                                                    ),
                                                    "default_action": {
                                                        "type": "web_url",
                                                        "url": article.url
                                                    },
                                                    "buttons": [{
                                                        "title": "Read More",
                                                        "type": "web_url",
                                                        "url": article.url
                                                    }]
                                                }

                                                // elements.push(element)
                                                // console.log(elements)

                                                bot.sendMessage(senderId, {
                                                    "attachment": {
                                                        "type": "template",
                                                        "payload": {
                                                            "template_type": "list",
                                                            "elements": elements,
                                                            "buttons": [{
                                                                "title": "More Headlines",
                                                                "type": "web_url",
                                                                "url": "https://m.1stheadlines.com/"
                                                            }]
                                                        }
                                                    }
                                                })

                                            })
                                    })
                            })

                    })

            })

    }
    else {
      for (const newsSite in newsSites) {       
        
        if (message === newsSites[newsSite].names[0] || message === newsSites[newsSite].names[1] || message === newsSites[newsSite].names[2]) {
          const apiUrl = 'https://newsapi.org/v1/articles?source='+ newsSites[newsSite].source +'&sortBy=top&apiKey=52a36d98da214f98a9b9b9bfaba502a7'

          request
              .get(apiUrl)
              .end((error, result) => {
                  const articles = result.body.articles

                  const elements = _.map(articles, (article) => {
                      return {
                          "title": article.title,
                          "image_url": article.urlToImage || 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-128.png',
                          //Subtitle limit is 80 characters
                          "subtitle": _.truncate(
                              article.description, {
                                  length: 80,
                                  separator: '...'
                              }
                          ),
                          "default_action": {
                              "type": "web_url",
                              "url": article.url
                          },
                          "buttons": [{
                              "title": "Read More",
                              "type": "web_url",
                              "url": article.url
                          }]
                      }
                  }).slice(0, 4)

                  bot.sendMessage(senderId, {
                      "attachment": {
                          "type": "template",
                          "payload": {
                              "template_type": "list",
                              "elements": elements,
                              "buttons": [{
                                  "title": "More "+ newsSite +" News",
                                  "type": "web_url",
                                  "url": newsSites[newsSite].site
                              }]
                          }
                      }
                  })
              })
        }
      }
    }

})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')