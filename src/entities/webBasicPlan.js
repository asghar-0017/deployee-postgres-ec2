const { EntitySchema } = require("typeorm");
const planStatus=require('./planStatus')

module.exports = new EntitySchema({
  name: "basicPlan",
  tableName: "web_basic_plan",
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
    plan: {
      type: "varchar",
      default: "Web Basic Plan",
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
  },
  relations: {
    client: {
      target: "Client",
      type: "many-to-one",
      joinColumn: { name: "clientId", referencedColumnName: "clientId" },
    },
  },
});
