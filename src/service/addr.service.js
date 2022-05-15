const Address = require('../model/addr.model')

console.log('------', Address)

class AddrService {
  async createAddr (addr) {
    const res = await Address.create(addr)
    return res
  }
}

module.exports = new AddrService()
