const Reddit = require("reddit");
const randomItem = require("random-item");

const reddit = new Reddit({
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
    appId: process.env.REDDIT_APPID,
    appSecret: process.env.REDDIT_APPSECRET
});

const tits = async message => {
    try {
        const res = await reddit.get("/r/boobs/rising", {});

        const randomElement = randomItem(res.data.children).data.thumbnail;
        message.channel.send("Ecco qua", { files: [randomElement] });
    } catch (err) {
        console.log(err);
        message.channel.send("Qualcosa non ha funzionato :(\n" + err);
    }
};

module.exports = tits;
