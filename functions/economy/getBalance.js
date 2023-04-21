const userSchema = require("../../schemas/userEconomySchema");

module.exports = (client) => {
  client.getBalance = async (userId, guildId) => {
    let dbBalance = await userSchema.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!dbBalance) return false;
    return dbBalance;
  };
};
