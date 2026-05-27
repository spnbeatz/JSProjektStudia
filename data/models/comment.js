const DbController = require('../core/index.js');

class Comment extends DbController {
    static options = {
        tableName: 'comments',
        allowedOrderBy: ['id', 'created_at', 'ticket_id']
    }

    static schema = {
        id: { required: false },
        ticket_id: { required: true },
        user_id: { required: true },
        comment: { required: true },
        is_internal: { required: false, default: 0 },
        created_at: { required: false, default: new Date() },
        updated_at: { required: false },
        deleted_at: { required: false }
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = Comment;