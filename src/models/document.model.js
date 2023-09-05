const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    aadhar: {
        aadhar_no: {
            type: String
        },
        aadharFilePath: {
            type: String
        }
    },
    pancard: {
        pancard_no: {
            type: String
        },
        pancardFilePath: {
            type: String
        }

    }
});


const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
