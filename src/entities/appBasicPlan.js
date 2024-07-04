const { EntitySchema } = require("typeorm");
const planStatus=require('./planStatus')

module.exports = new EntitySchema({
  name: "appbasicPlan",
  tableName: "app_basic_plan",
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
      reference_App: {
        type: "varchar",
        nullable: true,
      },
      drive_links_to_icons:{
        type:"varchar",
        nullable:true
      },
      description: {
        type: "varchar",
      },
      Link_to_Graphics: {
        type: "varchar",
        nullable: true,
      },
        plan:{
        type:"varchar",
        default: "App basic plan",
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