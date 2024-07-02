const { EntitySchema } = require("typeorm");
const logoProductTypes = require("./logoProductService");

module.exports = new EntitySchema({
  name: "logoBusinessPlane",
  tableName: "logo_business_plane",
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
      length: 255,
      nullable: true,
    },
    reference_logos: {
      type: "varchar",
      nullable: true,
    },
    reference_template: {
      type: "varchar",
      nullable: true,
    },
    reference_websites: {
      type: "varchar",
      nullable: true,
    },
    custom_product_design: {
      type: "varchar",
      nullable: true,
    },
    description: {
      type: "varchar",
      nullable: true,
    },
    Link_to_Graphics: {
      type: "varchar",
      nullable: true,
    },
    drive_link_to_reference_images: {
      type: "varchar",
      nullable: true,
    },
    product_design: {
      type: "enum",
      enum: logoProductTypes,
      enumName: "logo_products_enum", // Ensure this matches your PostgreSQL enum type name
      nullable: true,
    },
    plane:{
      type:"varchar",
      default: "Logo Business plane",
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
