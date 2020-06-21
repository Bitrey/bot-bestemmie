const mongoose = require("mongoose");

const dioSchema = new mongoose.Schema({
    server: { type: String, required: true },
    invocazioni: [
        {
            idUtente: { type: String, required: true },
            username: { type: String, required: true },
            listaBestemmie: [
                {
                    messaggio: { type: String, required: true },
                    date: {
                        type: String,
                        default: (
                            Date.parse(new Date(Date.now())) / 1000
                        ).toString()
                    }
                }
            ],
            dioCont: { type: Number, default: 0, min: 0 }
        }
    ],
    date: {
        type: String,
        default: (Date.parse(new Date(Date.now())) / 1000).toString()
    }
});

module.exports = mongoose.model("bestemmia", dioSchema);
