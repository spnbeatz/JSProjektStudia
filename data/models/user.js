const role = require('../../middleware/role.js');
const DbController = require('../core/index.js');
const db = require('../connect.js');
const bcrypt = require('bcrypt');

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

    static async createAdmin() {
        const hashedPassword = await bcrypt.hash('admin', 10);
        try {
            const [result] = await db.query(`
                INSERT INTO users (
                    name,
                    surname,
                    email,
                    password_hash,
                    role_id,
                    department_id,
                    is_active,
                    created_at,
                    updated_at,
                    last_login_at
                )
                VALUES (
                    'Admin',
                    'Adminowski',
                    'admin@example.com',
                    '${hashedPassword}',
                    1,
                    NULL,
                    1,
                    CURRENT_TIMESTAMP(6),
                    NULL,
                    NULL
                );
                `);
                return result;
        } catch (error) {
            console.error("Error creating admin user:", error);
        }
    }
}

module.exports = User;