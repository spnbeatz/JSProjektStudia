const DbController = require('../core/index.js');

class TicketAttachment extends DbController {
    static options = {
        tableName: 'ticket_attachments',
        allowedOrderBy: ['id', 'created_at', 'file_name']
    }

    static schema = {
        id: { required: false },
        ticket_id: { required: true },
        uploaded_by: { required: true },
        file_name: { required: true },
        file_path: { required: true },
        content_type: { required: false },
        file_size_bytes: { required: false },
        created_at: { required: false, default: new Date() },
        is_deleted: { required: false, default: 0 },
        deleted_at: { required: false },
        deleted_by: { required: false }
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = TicketAttachment;