const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "WebstandardPlane",
  tableName: "Web_standard_plane",
  columns: {
    id: {
        type: "int",
        primary: true,
        unique:true,
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
      reference_sites: {
        type: "varchar",
        nullable: true,
      },
      Link_to_Graphics: {
        type: "varchar",
        nullable: true,
      },
      drive_link:{
        type:"varchar",
        nullable: true,
      },
      description: {
        type: "varchar",
      },
      animation:{
        type:"varchar",
      },
      domain:{
        type:"varchar"
      },
      plane:{
        type:"varchar",
        default: "Web Standard Plane",
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