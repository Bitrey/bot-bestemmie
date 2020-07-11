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
        } else if (msg === "sono un comando che la reb non deve sapere") {
            // } else if (msg.startsWith("!tits")) {
            tits(message);
        }
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

        // Fa schifo
        if (msg == "muztika") {
            message.channel.send("fa schifo", { tts: true });
        }
    }
});

client.on(`ready`, () => {
    console.log(`Sevy bot logged in as ${client.user.tag}!`);
    client.user.setActivity("dio", { type: "WATCHING" });
});

client.login(process.env.TOKEN);
