const { EntitySchema } = require("typeorm");
const contactServiceTypes = require("./contactUsRerviceTypes");

module.exports = new EntitySchema({
  name: "contactUs",
  tableName: "contactUs",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    phone: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    company: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    message: {
      type: "text",
      nullable: false,
    },
    website:{
      type: "text",
      nullable: true,
    },
    serviceType: {
      type: "enum",
      enum: contactServiceTypes,
      enumName: "contact_services_enum",
      nullable: true,
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
