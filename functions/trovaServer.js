const Bestemmia = require("../models/bestemmie");
const Discord = require("discord.js");

const embed = guildName => {
    return new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`Ciao ${guildName}!`)
        .setDescription("Ho aggiunto questo server al database!")
        .addFields([
            {
                name: "Come funziona",
                value: "Invoca il signore e sali la classifica!"
            },
            { name: "!podio", value: 'Scrivi "!podio" per vedere il podio.' },
            {
                name: "!dii <persona>",
                value:
                    'Scrivi "!dii (Username)>" per vedere le invocazioni di una persona specifica.'
            }
        ])
        .setTimestamp()
        .setFooter(`Che dio sia con voi`);
};

const findServer = (message, callback) => {
    Bestemmia.findOne({ serverId: message.guild.id }, (err, foundServer) => {
        const { guild } = message;
        if (err) {
            message.channel.send("Si è verificato un errore: " + err);
            callback(false);
        } else if (!foundServer) {
            // Nuovo server
            message.channel.send(embed(guild.name));
            const newServer = new Bestemmia({
                server: guild.id
            });
            callback(newServer);
        } else {
            callback(foundServer);
        }
    });
};

module.exports = findServer;
