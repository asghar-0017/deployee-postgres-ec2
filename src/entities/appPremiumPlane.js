const { EntitySchema } = require("typeorm");


module.exports = new EntitySchema({
  name: "appPremiumPlane",
  tableName: "app_premium_plane",
  columns: {
    id: {
        type: "int",
        primary: true,
        generated: true,
      },
      clientId: {
        type: "varchar",
        unique: true,
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
      animation_Reference:{
        type:'varchar',
        nullable:true
      },
      description: {
        type: "varchar",
      },
      functionalities: {
        type: "json",
        nullable: true,
      },
      Link_to_Graphics: {
        type: "varchar",
        nullable: true,
      },
      plane:{
        type:"varchar",
        default: "App Premium plane",
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