const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "seoBasicPlane",
  tableName: "seo-basic-plane",  // Fixed typo here
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
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
    Website_of_the_client: {
      type: "varchar",
      nullable: true,
    },
    Platform_of_the_website: {
      type: "varchar",
      nullable: true,
    },
    competitor_website_reference: {
      type: "varchar",
      nullable: true,
    },
    current_SEO_Efforts: {
      type: "varchar",
      nullable: true,
    },
    access_and_permissions: {
      type: "varchar",
      nullable: false,  // This should be nullable: false if it's required
    },
    description: {
      type: "varchar",
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
