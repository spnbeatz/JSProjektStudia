const DbController = require('../core/index.js');

class Priority extends DbController {
    static options = {
        tableName: 'priorities',
        allowedOrderBy: ['id', 'code', 'name', 'sort_order', 'created_at']
    }

    static schema = {
        id: { required: false },
        code: { required: true },
        name: { required: true },
        sort_order: { required: true },
        is_active: { required: false, default: 1 },
        created_at: { required: false, default: new Date() },
        updated_at: { required: false }
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = Priority;