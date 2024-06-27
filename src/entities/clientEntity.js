// clientEntity.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Client",
  tableName: "clients",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    clientId: {
      type: "varchar",
      unique: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    name: {
      type: "varchar",
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
