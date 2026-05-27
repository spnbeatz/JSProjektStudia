const DbController = require('../core/index.js');

class TicketRating extends DbController {
    static options = {
        tableName: 'ticket_ratings',
        allowedOrderBy: ['id', 'created_at', 'rating']
    }

    static schema = {
        id: { required: false },
        ticket_id: { required: true },
        user_id: { required: true },
        rating: { required: true },
        comment: { required: false },
        created_at: { required: false, default: new Date() }
    }

    constructor(data = {}) {
        super(data);
    }
}

module.exports = TicketRating;