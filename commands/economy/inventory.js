const {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  time,
} = require("discord.js");

const userInventorySchema = require("../../schemas/inventorySchema");
const userEconomySchema = require("../../schemas/userEconomySchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Check what items you have that you bought from the shop")
    .addSubcommand((subCommand) => {
      return subCommand
        .setName("view")
        .setDescription("view your inventory")
        .addNumberOption((option) =>
          option.setName("page").setDescription("The page you want to go to")
        );
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName("use_item")
        .setDescription("use an item from your inventory")
        .addStringOption((str) => {
          return str
            .setName("identifier")
            .setDescription("Item identifier")
            .setRequired(true);
        });
    }),
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "view":
        const page = interaction.options.getNumber("page");
        const inventoryData = await userInventorySchema.find({
          guildId: interaction.guild.id,
          userId: interaction.user.id,
        });

        if (!inventoryData?.length)
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription("you don't have any item in your inventory!")
                .setColor("Red"),
            ],
          });

        const embed = new EmbedBuilder()
          .setTitle(`${interaction.user.username}'s inventory`)
          .setColor(0x2f3136);

        // if the user selected a page
        if (page) {
          const pageNum = 5 * page - 5;

          if (inventoryData.length >= 6) {
            embed.setFooter({
              text: `page ${page} of ${Math.ceil(inventoryData.length / 5)}`,
            });
          }

          for (const item of inventoryData.splice(pageNum, 5)) {
            embed.addFields({
              name: `<:note_emoji_2:1028290390194929814>  ${item._id}`,
              value: `<:replycontinued:1015235683209707534> Note: \`${item.note}\`\n<:replycontinued:1015235683209707534> Note Date: ${item.noteDate}\n<:reply:1015235235195146301> Moderator: ${moderator}`,
            });
          }

          return await interaction.reply({ embeds: [embed] });
        }

        if (inventoryData.length >= 6) {
          embed.setFooter({
            text: `page 1 of ${Math.ceil(inventoryData.length / 5)}`,
          });
        }

        for (const item of inventoryData.slice(0, 5)) {
          embed.addFields({
            name: `${item.itemName}  <->  $${item.itemPrice}`,
            value: `> Identifier: \`${item.itemIdentifier}\`\n> Description: ${item.itemDescription}\n> Given Role: ${item.role}\n> Given Money: ${item.money}\n`,
          });
        }

        await interaction.reply({ embeds: [embed] });
        break;
      case "use_item":
        const identifier = interaction.options.getString("identifier");
        const invSchema = await userInventorySchema.findOne({
          guildId: interaction.guild.id,
          userId: interaction.user.id,
        });

        if (!invSchema || !invSchema.itemIdentifier === identifier) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  "You have not bought that item from the shop yet or that item does not exist!"
                )
                .setColor("Red"),
            ],
          });
        }

        const item = await userInventorySchema.findOne({
          guildId: interaction.guild.id,
          userId: interaction.user.id,
          itemIdentifier: identifier,
        });

        if (!item.role && !item.money)
          return await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  "That item cannot be used its just for display!"
                )
                .setColor("Red"),
            ],
          });

        if (item.role) {
          await interaction.member.roles.add(item.role).catch((err) => {
            interaction.reply({
              content:
                "ERROR: I cannot give you the role. It might be cause i don't have permissions to or that i am not above the role. Contact admins of this server and ask them to fix this.",
            });

            return console.log(err);
          });

          await userInventorySchema.findOneAndDelete({ _id: item._id });

          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `The role: ${interaction.guild.roles.cache.get(
                    item.role
                  )} has been given to you!`
                )
                .setColor("Green"),
            ],
            ephemeral: true,
          });
        }

        if (item.money) {
          const selectedUserBalance = await client.fetchBalance(
            interaction.user.id,
            interaction.guild.id
          );

          await userEconomySchema.findOneAndUpdate(
            { _id: selectedUserBalance._id },
            {
              balance: await client.toFixedNumber(
                selectedUserBalance.balance + item.money
              ),
            }
          );

          await userInventorySchema.findOneAndDelete({
            _id: item._id,
          });

          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `$${item.money} has been added to your balance!`
                )
                .setColor("Green"),
            ],
            ephemeral: true,
          });
        }

        break;

      default:
        break;
    }
  },
};
