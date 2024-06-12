const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "digitalMerketing",
  tableName: "digital_marketing",
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
      links_to_soial_media:{
        type: "varchar",
        nullable: true,
      },
      target_audiance: {
        type: "varchar",
        nullable: true,
      },
      access_and_permissions: {
        type: "varchar",
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