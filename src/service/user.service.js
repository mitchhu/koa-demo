class UserService {
  async createUser(user_name, password) {
    return user_name + password
  }
}


module.exports = new UserService()