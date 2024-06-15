const { EntitySchema } = require("typeorm");
const logoProductService = require('../entities/logoProductService');

module.exports = new EntitySchema({
  name: "logoPremiumPlane",
  tableName: "logo_premium_plane",
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
    },
    reference_logos: {
      type: "varchar",
      nullable: true,
    },
    reference_template: {
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
