const Discord = require("discord.js");
const trovaServer = require("./trovaServer");

const podioEmbed = dati => {
    const fields = dati.map(dato => {
        return { name: dato.username, value: dato.dioCont };
    });
    fields.sort((a, b) => {
        return a.value - b.value;
    });
    if (fields.length > 3) {
        fields.splice(0, fields.length - 3);
    }
    return new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Podio")
        .setThumbnail("https://i.imgur.com/iJcVG2u.jpg")
        .setDescription("La classifica dei più religiosi")
        .addFields(fields)
        .setTimestamp()
        .setFooter(`Complimenti a ${fields[fields.length - 1].name}!`);
};

const podio = message => {
    const asyncMessage = message;
    trovaServer(message, server => {
        if (!server) {
            return false;
        }
        const dati = server.invocazioni;
        if (dati.length <= 0) {
            asyncMessage.channel.send("Nessun dato salvato");
        } else {
            try {
                asyncMessage.channel.send(podioEmbed(dati));
            } catch (e) {
                asyncMessage.channel.send(`Si è verificato un errore: ${e}`);
            }
        }
    });
};

module.exports = podio;
