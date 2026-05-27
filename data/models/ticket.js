const DbController = require('../core/index.js');

class Ticket extends DbController {
    static options = {
        tableName: 'tickets',
        allowedOrderBy: ['id', 'title', 'created_at', 'updated_at', 'status_id', 'priority_id']
    }

    static schema = {
        id: { required: false },
        requestor_id: { required: true },
        department_id: { required: false },
        agent_id: { required: false },
        title: { required: true },
        description: { required: false },
        category_id: { required: false },
        status_id: { required: true },
        priority_id: { required: true },
        created_at: { required: false, default: new Date() },
        assigned_at: { required: false },
        updated_at: { required: false },
        resolved_at: { required: false },
        closed_at: { required: false }
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = Ticket;