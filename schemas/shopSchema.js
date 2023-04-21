const { Schema, model } = require("mongoose");
const shopEconomySchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,

  itemName: String,
  itemDescription: String,
  itemPrice: String,
  itemIdentifier: String, // Unique identifier for every item (auto generated 16bit token) or user set

  role: String, // the role to give to the user when he uses the item
  money: Number,  // amount of money to give to the user when he uses the item
});

module.exports = model("shopEconomySchema", shopEconomySchema, "guildShopEconomySchema");