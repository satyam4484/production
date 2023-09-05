const Document = require('../models/document.model');
const path = require('path'); // Import the path module

// Handle document upload
const uploadDocument = async (req, res) => {

    try {
        const { aadhar_no, pancard_no } = req.body;

        let aadharFilePath = '';
        let pancardFilePath = '';

        if (req.files) {
            req.files.map((file) => {
                const { fieldname, path } = file;
                switch (fieldname) {
                    case "aadhar_photo":
                        aadharFilePath = path
                    case "pancard_photo":
                        pancardFilePath = path
                }
            });
        } else {
            console.log("please try again!")
        }

        const document = new Document({
            aadhar: { aadhar_no, aadharFilePath },
            pancard: { pancard_no, pancardFilePath }
        });
        await document.save();

        res.status(201).json({ success: true, message: 'Document uploaded successfully', document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error uploading document' });
    }
};

module.exports = {
    uploadDocument
};
