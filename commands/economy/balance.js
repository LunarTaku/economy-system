const {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  time,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Returns the balance of a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to get the balance of")
    ),
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user =
      interaction.options.getUser("user") || interaction.user;
    const dbBalance = await client.getBalance(
      user.id,
      interaction.guild.id
    );

    if (!dbBalance) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `Oops! ${user.tag} does not have a balance yet. A reason for this is they might have not talked in this server yet or the admins removed his balance!`
          ),
        ],
        ephemeral: true,
      });
    }

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${user.username}'s balance`)
          .setDescription(`**User has $${dbBalance.balance}**`)
          .setFooter({ text: user.tag, iconURL: user.displayAvatarURL() })
          .setColor("Random")
          .setTimestamp()
      ],
    });
  },
};
