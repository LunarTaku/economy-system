const { Schema, model } = require("mongoose");
const userEconomySchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  balance: { type: Number, default: 0 },
});

module.exports = model("userEconomySchema", userEconomySchema, "guildUserEconomySchema");