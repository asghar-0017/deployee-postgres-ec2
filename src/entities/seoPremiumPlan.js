const { EntitySchema } = require("typeorm");
const planStatus=require('./planStatus')

module.exports = new EntitySchema({
  name: "seopremiumPlan",
  tableName: "seo-premium-plan",  // Fixed typo here
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
    plan:{
      type:"varchar",
      default: "SEO Premium plan",
      },
      status:{
        type:"varchar",
        default: "Pending",
        enum:planStatus,
        enumName: "Plan_Status_enum",
        nullable: false,
        },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    delivery_date: {
      type: "timestamp",
      nullable: true,
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
