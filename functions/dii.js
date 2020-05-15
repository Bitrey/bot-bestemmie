const Discord = require("discord.js");
const moment = require("moment");
const trovaServer = require("./trovaServer");
moment.locale("it");

const listaSanti = require(`../elementiSanti.json`).paroleSante;

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
        const foundUser = server.invocazioni.find(
            e => e.username == typedUsername
        );
        if (!foundUser) {
            // Se l'utente non l'ha mai invocato
            asyncMessage.channel.send(
                `Non ho trovato nessun "${typedUsername}"!`
            );
        } else {
            try {
                const length = 30;
                const fields = foundUser.listaBestemmie.map(v => {
                    let str = v.messaggio;

                    if (str.length > length) {
                        for (parolaSanta of listaSanti) {
                            const parolaIndex = v.messaggio.indexOf(
                                parolaSanta
                            );
                            if (parolaIndex > -1) {
                                str =
                                    v.messaggio.slice(
                                        parolaIndex,
                                        v.messaggio.length
                                    ) || v.messaggio;
                                break;
                            }
                        }
                    }

                    const trimmedString =
                        str.length > length
                            ? str.substring(0, length - 3) + "..."
                            : str;
                    return {
                        name: moment(v.date, "X").fromNow(),
                        value: trimmedString
                    };
                });
                asyncMessage.channel.send(embed(fields, foundUser.username));
            } catch (e) {
                asyncMessage.channel.send(`Si è verificato un errore: ${e}`);
            }
        }
    });
};

module.exports = dii;
