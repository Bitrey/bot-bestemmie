const mongoose = require("mongoose");
const moment = require("moment");

const dioSchema = new mongoose.Schema({
    idUtente: { type: String, required: true },
    username: { type: String, required: true },
    listaBestemmie: [
        {
            messaggio: { type: String, required: true },
            date: {
                type: String,
                default: moment(new Date(Date.now())).format("X")
            }
        }
    ],
    dioCont: { type: Number, default: 0, min: 0 }
});

module.exports = mongoose.model("bestemmia", dioSchema);
