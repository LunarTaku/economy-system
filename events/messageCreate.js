const userSchema = require("../../schemas/userEconomySchema");
const { Client, Message } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.author.bot) return;

    const randomAmount = Math.random() * (0.7 - 0.3) + 0.3;
    const dbBalance = await client.fetchBalance(
      interaction.author.id,
      interaction.guild.id
    );

        console.log(await client.toFixedNumber(
            dbBalance.balance + randomAmount
          ))

    await userSchema.findOneAndUpdate(
      { _id: dbBalance._id },
      {
        balance: await client.toFixedNumber(
          dbBalance.balance + randomAmount
        ),
      }
    );
  },
};
