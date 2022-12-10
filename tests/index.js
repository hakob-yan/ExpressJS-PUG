const assert = require('assert');
const superagent = require('superagent')
const expect = require('expect.js')
const str = 'a,b,c';


describe('Str#Split', () => {
 console.log(require.main);
    it('should respond ok', (done)=>{
        superagent.get('http://localhost:3000/').end((err,res)=>{
            expect(res.status).to.equal(200)
            done()
        });
    })
})