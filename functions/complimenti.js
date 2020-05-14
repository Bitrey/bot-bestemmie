const Discord = require("discord.js");

module.exports = (text, username) => {
    return new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Mi avete chiamato?")
        .setThumbnail("https://i.imgur.com/vPq9eko.png")
        .setDescription(text)
        .setTimestamp()
        .setFooter(`Visualizza tutti i tuoi dii con !dii ${username}`);
};
