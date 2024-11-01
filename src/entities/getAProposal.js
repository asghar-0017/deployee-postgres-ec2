const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "get-A-Proposal",
  tableName: "get-A-Proposal",
  columns: {
    id: {
        type: "int",
        primary: true,
        generated: "increment",
      },
    email: {
      type: "varchar",
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
 
});
