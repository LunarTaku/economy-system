const { Types } = require("mongoose");
const userSchema = require("../../schemas/userEconomySchema");

module.exports = (client) => {
  client.fetchBalance = async (userId, guildId) => {
    let dbBalance = await userSchema.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!dbBalance) {
      dbBalance = await new userSchema({
        _id: Types.ObjectId(),
        userId: userId,
        guildId: guildId,
      });

      await dbBalance.save().catch((err) => console.log(err));
      return dbBalance;
    }

    return dbBalance;
  };
};
