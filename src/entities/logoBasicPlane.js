const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "logoBasicPlane",
  tableName: "logo_basic_plane",
  columns: {
    id: {
        type: "int",
        primary: true,
        generated: true,
      },
      name: {
        type: "varchar",
      },
      email: {
        type: "varchar",
      },
      company: {
        type: "varchar",
        nullable: true,
      },
      reference_logos: {
        type: "varchar",
        nullable: true,
      },
      Link_to_Graphics: {
        type: "varchar",
        nullable: true,
      },
      description: {
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