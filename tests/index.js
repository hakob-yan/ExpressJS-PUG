const superagent = require('superagent')
const expect = require('expect.js')
const boot = require('../app').boot;
const shutdown = require('../app').shutdown;
const port = require('../app').port;

const seedArticles = require('../db/articles.json')


describe('server', () => {
    before(() => boot())
    describe('homepage', () => {
        it('should respond to GET', (done) => {
            superagent.get(`http://localhost:${port}`).end(
                (err, res) => {
                    expect(err).to.be(null);
                    expect(res.text).to.be.ok;
                    expect(res.text).not.to.contain(`<h2><a href="/articles`)
                    // seedArticles.forEach(item=>{
                    //     console.log(item);
                    // })
                }
            )
            done()
        })
    })
    after(()=>shutdown())
})