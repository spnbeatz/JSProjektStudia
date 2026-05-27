const DbController = require('../core/index.js');

class User extends DbController {
    static options = {
        tableName: 'users',
        allowedOrderBy: ['id', 'name', 'surname', 'email', 'created_at', 'last_login_at']
    }

    static schema = {
        id: { required: false },
        name: { required: true },
        surname: { required: true },
        email: { required: true },
        password_hash: { required: true },
        role_id: { required: true },
        department_id: { required: false },
        is_active: { required: false, default: 1 },
        created_at: { required: false, default: new Date() },
        updated_at: { required: false },
        last_login_at: { required: false }
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = User;