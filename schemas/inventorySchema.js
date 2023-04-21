const { Schema, model } = require("mongoose");
const userInventorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,

  itemIdentifier: String,
  itemName: String,
  itemDescription: String,
  itemPrice: String, 
  role: String,
  money: Number,  
});

module.exports = model("userInventorySchema", userInventorySchema, "guildUserInventorySchema");