const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "basicPlain",
  tableName: "basicPlain",
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
  },
});
