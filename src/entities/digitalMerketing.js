const { EntitySchema } = require("typeorm");
const planStatus=require('./planStatus')


module.exports = new EntitySchema({
  name: "digitalMarketing",
  tableName: "digital_marketing",
  columns: {
    id: {
      type: "int",
      primary: true,
      unique: true,
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
    plan: {
      type: "varchar",
      default: "Digital Marketing",
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
