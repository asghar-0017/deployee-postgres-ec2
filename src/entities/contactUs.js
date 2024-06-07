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
    },
    email: {
      type: "varchar",
    },
    phone: {
      type: "varchar",
    },
    company: {
      type: "varchar",
    },
    message: {
      type: "varchar",
    },
    serviceType: {
      type: "enum",
      enum: ["Web Development", "App Development", "Digital Marketing", "Search Engine Optimization"],
      enumName: "contact_services_enum" // Add this line
    },
  },
});
