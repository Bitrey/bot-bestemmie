require(`dotenv`).config();
const mongoose = require("mongoose");
const Discord = require(`discord.js`);
const client = new Discord.Client();
const handleBestemmia = require("./functions/handleBestemmia");
const podio = require("./functions/podio");
const dii = require("./functions/dii");
const tits = require("./functions/tits");

const botUserId = process.env.BOT_USER_ID;
const testServerName = "Bitrey Bot Testing";

// MONGOOSE SETUP
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI, function () {
    console.log("Database connesso!");
});

const listaSanti = require(`./elementiSanti.json`).paroleSante;

client.on(`message`, message => {
    const msg = message.content.toLowerCase();
    if (message.author.id !== botUserId) {
        if (msg.startsWith("!podio")) {
            podio(message);
            return false;
        } else if (msg.startsWith("!dii")) {
            dii(message);
            return false;
        }
        // else if (
        //     msg === "sono un comando che la reb non deve sapere" ||
        //     msg.startsWith("!tits")
        // ) {
        //     // } else if (msg.startsWith("!tits")) {
        //     tits(message);
        // }
        let totDioLength = 0;
        for (parolaSanta of listaSanti) {
            const dioLength = msg.split(parolaSanta).length - 1;
            const isWord = msg.split(" ").includes(parolaSanta);
            if (dioLength > 0 && isWord) {
                totDioLength += dioLength;
            }
        }
        if (totDioLength > 0) {
            handleBestemmia(message, totDioLength);
        }

        const occhioreb = message.guild.emojis.cache
            .find(emoji => emoji.name === "occhioreb")
            .toString();
        const catt1 = message.guild.emojis.cache
            .find(emoji => emoji.name === "catt1")
            .toString();
        const catt7 = message.guild.emojis.cache
            .find(emoji => emoji.name === "catt1")
            .toString();
        const alepanco = message.guild.emojis.cache
            .find(emoji => emoji.name === "alepanco")
            .toString();
        const ff1 = message.guild.emojis.cache
            .find(emoji => emoji.name === "alewide3")
            .toString();
        const ff2 = message.guild.emojis.cache
            .find(emoji => emoji.name === "alewide2")
            .toString();
        const ff3 = message.guild.emojis.cache
            .find(emoji => emoji.name === "alewide1")
            .toString();
        const jj = message.guild.emojis.cache
            .find(emoji => emoji.name === "jjgaming2")
            .toString();
        const catty = message.guild.emojis.cache
            .find(emoji => emoji.name === "catty1")
            .toString();
        const furry = message.guild.emojis.cache
            .find(emoji => emoji.name === "mrfurry1")
            .toString();
        const rxsty = message.guild.emojis.cache
            .find(emoji => emoji.name === "rxstyemote2")
            .toString();
        const ivan = message.guild.emojis.cache
            .find(emoji => emoji.name === "ivanetor2")
            .toString();

        // Fa schifo
        if (msg == "muztika") message.channel.send("fa schifo", { tts: true });
        else if (msg == "sevy") message.channel.send("gaming");
        else if (msg == "seba") message.channel.send("cassa");
        else if (msg == "reb" || msg == "rebz")
            message.channel.send(occhioreb || "non trovo l'emoji :(");
        else if (msg == "bitrey")
            message.channel.send(catt1 || "non trovo l'emoji :(");
        else if (msg == "alepanco")
            message.channel.send(alepanco || "non trovo l'emoji :(");
        else if (msg == "fiocchetto" || msg == "focchietto")
            message.channel.send(catt7 || "non trovo l'emoji :(");
        else if (msg == "ff")
            message.channel.send(
                ff1 ? `${ff1}${ff2}${ff3}` : "non trovo l'emoji :("
            );
        else if (msg == "jj" || msg == "jojax" || msg == "jojaxgaming")
            message.channel.send(jj || "non trovo l'emoji :(");
        else if (msg == "catty")
            message.channel.send(catty || "non trovo l'emoji :(");
        else if (msg == "furry" || msg == "mrfurry" || msg == "carrisi")
            message.channel.send(furry || "non trovo l'emoji :(");
        else if (msg == "andre" || msg == "rxsty")
            message.channel.send(rxsty || "non trovo l'emoji :(");
        else if (
            msg == "ivan" ||
            msg == "iv4n" ||
            msg == "ivanetor" ||
            msg == "iv4netor"
        )
            message.channel.send(ivan || "non trovo l'emoji :(");
    }
});

client.on(`ready`, () => {
    console.log(`Sevy bot logged in as ${client.user.tag}!`);
    client.user.setActivity("dio", { type: "WATCHING" });
});

client.login(process.env.TOKEN);
