const DbController = require('../core/index.js');

class User extends DbController {
  static tableName = 'users';

  constructor(username, password) {
    super();
    this.username = username;
    this.password = password;
  }
}

module.exports = User;