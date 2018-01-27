import React from 'react'
import FeedMe from 'feedme'
import http from 'http'


const RssReader = async (feed) => {
    const episodes = []
    await http.get(feed, (res) => {
    if (res.statusCode != 200) {
        console.error(new Error(`status code ${res.statusCode}`))
        return
    }
    var parser = new FeedMe(true);
    res.pipe(parser)
    parser.on('item', ()=> {
        episodes.push(parser.done())
    })
})

return episodes
}

export default RssReader