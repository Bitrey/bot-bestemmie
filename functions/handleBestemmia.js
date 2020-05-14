const Bestemmia = require("../models/bestemmie");
const complimenti = require("./complimenti");

// channel.send(exampleEmbed);

const handleBestemmia = (message, dioLength) => {
    const asyncMessage = message;
    try {
        Bestemmia.findOne({ idUtente: message.author.id }, (err, foundUser) => {
            // In caso di errore
            if (err) {
                asyncMessage.channel.send(
                    "Si è verificato un errore nella ricerca"
                );
                return false;
            } else if (!foundUser) {
                // Se l'utente non l'ha mai invocato
                const nuovoUtente = new Bestemmia({
                    idUtente: asyncMessage.author.id,
                    username: asyncMessage.author.username,
                    listaBestemmie: [
                        {
                            messaggio: asyncMessage.content
                        }
                    ],
                    dioCont: dioLength
                });
                nuovoUtente.save(err => {
                    if (err) {
                        asyncMessage.channel.send(
                            "Si è verificato un errore nel salvataggio"
                        );
                    } else {
                        asyncMessage.channel.send(
                            `Complimenti a ${asyncMessage.author.username} per la sua prima invocazione di dio!`
                        );
                    }
                });
            } else {
                // Se sì, pusha il messaggio
                foundUser.listaBestemmie.push({
                    messaggio: asyncMessage.content
                });
                foundUser.username = asyncMessage.author.username;
                foundUser.dioCont += dioLength;
                foundUser.save(err => {
                    if (err) {
                        asyncMessage.channel.send(
                            "Si è verificato un errore nel salvataggio"
                        );
                    } else {
                        const username = asyncMessage.author.username;
                        asyncMessage.channel.send(
                            complimenti(
                                `Bravo ${username}, sei a ${foundUser.dioCont} invocazioni di dio!`,
                                username
                            )
                        );
                    }
                });
            }
        });
    } catch (e) {
        asyncMessage.channel.send(`Si è verificato un errore: ${e}`);
    }
};

module.exports = handleBestemmia;