// server.js
// where your node app starts
// init project
// http://jsbeautifier.org/
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

const newsSites = {
    NYT: {
        names: ["nyt", "NYT", "Nyt"],
        site: "https://www.nytimes.com/",
        source: "the-new-york-times"
    },
    CNN: {
        names: ["cnn", "CNN", "Cnn"],
        site: "https://www.cnn.com/",
        source: "cnn"
    },
    Bloomberg: {
        names: ["bb", "Bloomberg", "bloomberg"],
        site: "https://www.bloomberg.com/",
        source: "bloomberg"
    },
    TechCrunch: {
        names: ["techcrunch", "Techcrunch", "TechCrunch"],
        site: "https://techcrunch.com",
        source: "techcrunch"
    },
    TechRadar: {
        names: ["techradar", "Techradar", "TechRadar"],
        site: "https://techradar.com",
        source: "techradar"
    },
    ABC: {
        names: ["abc", "ABC", "ABC News"],
        site: "https://abcnews.go.com/",
        source: "abc-news"
    },
    BBC: {
        names: ["bbc", "BBC", "BBC News"],
        site: "https://www.bbc.com/news",
        source: "bbc-news"
    },

};

bot.setGetStartedButton([{
    "payload": "1"
}], (result1, result2) => console.log("getStarted", result1, result2));

bot.setPersistentMenu([{
        "title": "Headlines",
        "type": "postback",
        "payload": "Headlines"
    },
    {
        "title": "CNN",
        "type": "postback",
        "payload": "CNN"
    }

], (result1, result2) => console.log("getStarted", result1, result2));

bot.on('postback', (payload) => {
    const senderId = payload.sender.id;
    if (payload.postback.payload === 'GET_STARTED_PAYLOAD') {


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

    handleResponse(payload, payload.postback.payload);
})



bot.on('message', (payload) => {
    handleResponse(payload, payload.message.text);




})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')

function handleResponse(payload, message) {
    const senderId = payload.sender.id;

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

                elements.push(element);

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
                        elements.push(element);

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

    }
    else {
        for (const newsSite in newsSites) {

            if (message === newsSites[newsSite].names[0] || message === newsSites[newsSite].names[1] || message === newsSites[newsSite].names[2]) {
                const apiUrl = 'https://newsapi.org/v1/articles?source=' + newsSites[newsSite].source + '&sortBy=top&apiKey=52a36d98da214f98a9b9b9bfaba502a7'

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
                                        "title": "More " + newsSite + " News",
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
}