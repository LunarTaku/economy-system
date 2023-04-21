const {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  time,
} = require("discord.js");
const userSchema = require("../../schemas/userEconomySchema");
const userEconomySchema = require("../../schemas/userEconomySchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("pays a user a selected amount")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to pay")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount to pay the user")
        .setRequired(true)
        .setMaxValue(1000)
        .setMinValue(1)
    ),
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");

    const userBalance = await client.fetchBalance(
      interaction.user.id,
      interaction.guild.id
    );
    let amount = interaction.options.getNumber("amount");

    if (user.bot || user.id === interaction.user.id)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("You cant send money to yourself or a bot!")
            .setColor("Red"),
        ],
        ephemeral: true,
      });

    if (amount > userBalance.amount)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              "You don't have enough money in your balance to pay that user."
            )
            .setColor("Red"),
        ],
      });

    const selectedUserBalance = await client.fetchBalance(
      user.id,
      interaction.guildId
    );

    amount = await client.toFixedNumber(amount);

    await userEconomySchema.findOneAndUpdate(
      { _id: userBalance._id },
      { balance: await client.toFixedNumber(userBalance.balance - amount) }
    );

    await userEconomySchema.findOneAndUpdate(
      { _id: selectedUserBalance._id },
      {
        balance: await client.toFixedNumber(
          selectedUserBalance.balance + amount
        ),
      }
    );

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `You have successfully transferred $${amount} to ${user}!`
          )
          .setColor("Green"),
      ],
      ephemeral: true,
    });

    await client.users.cache.get(user.id).send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `You have received a total of ${amount} from ${
              interaction.user
            }! This amount has been deposited to your balance and you total now is $${
              selectedUserBalance.balance + amount
            }`
          )
          .setColor("Green")
          .setImage(
            "https://cdn.discordapp.com/attachments/1098838797229236315/1098864088639078481/money-banner.png"
          ),
      ],
    });
  },
};
