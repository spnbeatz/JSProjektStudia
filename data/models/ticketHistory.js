const DbController = require("../core/index.js");

class TicketHistory extends DbController {
  static options = {
    tableName: "tickets_history",
    allowedOrderBy: ["id", "history_created_at", "ticket_id"],
  };

  static schema = {
    id: { required: false },
    ticket_id: { required: true },
    requestor_id: { required: true },
    department_id: { required: false },
    agent_id: { required: false },
    title: { required: true },
    description: { required: false },
    category_id: { required: false },
    status_id: { required: true },
    priority_id: { required: true },
    created_at: { required: true },
    assigned_at: { required: false },
    updated_at: { required: false },
    resolved_at: { required: false },
    closed_at: { required: false },
    changed_by: { required: false },
    history_created_at: { required: false, default: new Date() },
  };

  constructor(data = {}) {
    super(data);
  }
}

module.exports = TicketHistory;
