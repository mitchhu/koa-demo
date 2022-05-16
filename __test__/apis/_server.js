const axios = require('axios')
// const supertest = require('supertest');

// const server = require('../../src/app').callback();
// const request = supertest(server);
// request.get(url).query(bodyOrParams).set(headers).expect(status).end(done);

module.exports = {

  async get (url) {
    const res = await axios.get(url)
    return res
  }
}
