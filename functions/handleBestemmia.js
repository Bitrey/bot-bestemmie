const complimenti = require("./complimenti");
const trovaServer = require("./trovaServer");

const handleBestemmia = (message, dioLength) => {
    const asyncMessage = message;
    try {
        trovaServer(message, server => {
            if (!server) {
                return false;
            }
            const foundUser = server.invocazioni.find(
                e => e.idUtente == message.author.id
            );
            if (!foundUser) {
                // Se l'utente non l'ha mai invocato
                // const nuovoUtente = new Bestemmia(
                server.invocazioni.push({
                    idUtente: asyncMessage.author.id,
                    username: asyncMessage.author.username,
                    listaBestemmie: [
                        {
                            messaggio: asyncMessage.content
                        }
                    ],
                    dioCont: dioLength
                });
                server.save(err => {
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
                server.save(err => {
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
