const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "basicPlane",
  tableName: "web_basic_plane",
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
      reference_sites: {
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
      plane:{
        type:"varchar",
        default: "Web Basic Plane",
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