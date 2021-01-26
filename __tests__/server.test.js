const app = require('../src/server/server') 
const supertest = require('supertest')
const request = supertest(app)
it('Test /allData ', async done => {
  const response = await request.get('/allData')
  expect(response.status).toBe(200) 
  expect(response.body).toBeDefined(); 
  done()
})