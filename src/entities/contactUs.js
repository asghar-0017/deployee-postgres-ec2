const { EntitySchema } = require("typeorm");

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
      nullable: false,
    },
    company: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    message: {
      type: "text",
      nullable: true,
    },
    serviceType: {
      type: "enum",
      enum: [
        "Web Development",
        "App Development",
        "Digital Marketing",
        "Search Engine Optimization",
        "Mobile App Development"
      ],
      enumName: "contact_services_enum",
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
