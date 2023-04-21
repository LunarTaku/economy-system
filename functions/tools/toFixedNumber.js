const userSchema = require("../../schemas/userEconomySchema");

module.exports = (client) => {
  client.toFixedNumber = async (number, places = 2) => {
    const offset = Number(`1e${places}`)
    return Math.floor(number * offset) / offset;
  }
};
