const { EntitySchema } = require("typeorm");
const planStatus=require('./planStatus')

module.exports = new EntitySchema({
  name: "basicPlane",
  tableName: "web_basic_plane",
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
    plane: {
      type: "varchar",
      default: "Web Basic Plane",
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
