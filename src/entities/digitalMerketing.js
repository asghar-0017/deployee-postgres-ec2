const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "digitalMarketing",
  tableName: "digital_marketing",
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
      nullable: false,
    },
    email: {
      type: "varchar",
      nullable: false,
    },
    company: {
      type: "varchar",
      nullable: true,
    },
    links_to_social_media: {
      type: "varchar",
      nullable: true,
    },
    target_audience: {
      type: "varchar",
      nullable: true,
    },
    access_and_permissions: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "varchar",
      nullable: false,
    },
    plane:{
      type:"varchar",
      default: "Digital Marketing",
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
