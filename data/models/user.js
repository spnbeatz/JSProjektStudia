const role = require('../../middleware/role.js');
const DbController = require('../core/index.js');

class User extends DbController {

    static options = {
        tableName: 'users',
        allowedOrderBy: ['id', 'username', 'created_at']
    }

    static schema = {
        id: { required: false },
        username: { required: true },
        password: { required: true },
        role: { required: false, default: 'user' },
        created_at: { required: false, default: new Date() },
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = User;