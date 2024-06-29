const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "logoStandardPlane",
  tableName: "logo_standard_plane",
  columns: {
    id: {
        type: "int",
        primary: true,
        generated: true,
      },
      clientId: {
        type: "varchar",
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
      plane:{
        type:"varchar",
        default: "Logo Standard plane",
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
 
  }, relations: {
    client: {
      target: "Client",
      type: "many-to-one",
      joinColumn: { name: "clientId", referencedColumnName: "clientId" },
    },
  },
});