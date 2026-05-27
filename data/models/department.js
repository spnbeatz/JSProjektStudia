const DbController = require('../core/index.js');

class Department extends DbController {
    static options = {
        tableName: 'departments',
        allowedOrderBy: ['id', 'name', 'sort_order', 'created_at']
    }

    static schema = {
        id: { required: false },
        parent_id: { required: false },
        name: { required: true },
        root_name: { required: false },
        sort_order: { required: true },
        is_active: { required: false, default: 1 },
        created_at: { required: false, default: new Date() },
        updated_at: { required: false }
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = Department;