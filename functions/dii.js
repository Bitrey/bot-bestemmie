const Discord = require("discord.js");
const moment = require("moment");
moment.locale("it");

const embed = (fields, username) => {
    return new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`Le invocazioni di ${username}`)
        .setThumbnail("https://i.imgur.com/vPq9eko.png")
        .addFields(fields)
        .setDescription(
            fields.length <= 0
                ? "Ancora niente :("
                : `Bravo ${username}, continua così!`
        )
        .setTimestamp()
        .setFooter(`Fai !podio per vedere il podio!`);
};

const dii = message => {
    const asyncMessage = message;
    const typedUsername = message.content.split("!dii ")[1];
    trovaServer(message, server => {
        if (!server) {
            return false;
        }
        server.invocazioni.findOne(
            { username: typedUsername },
            (err, foundUser) => {
                // In caso di errore
                if (err) {
                    asyncMessage.channel.send(
                        "Si è verificato un errore nella ricerca"
                    );
                    return false;
                } else if (!foundUser) {
                    // Se l'utente non l'ha mai invocato
                    asyncMessage.channel.send(
                        `Non ho trovato nessun "${typedUsername}"!`
                    );
                } else {
                    try {
                        const fields = foundUser.listaBestemmie.map(v => {
                            return {
                                name: moment(v.date, "X").fromNow(),
                                // name: v.date,
                                value: v.messaggio
                            };
                        });
                        asyncMessage.channel.send(
                            embed(fields, foundUser.username)
                        );
                    } catch (e) {
                        asyncMessage.channel.send(
                            `Si è verificato un errore: ${e}`
                        );
                    }
                }
            }
        );
    });
};

module.exports = dii;
