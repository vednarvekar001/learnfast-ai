import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';
import Upload from '../Schemas/upload.schema.js';

export const uploadHandler = async (req, res) => {
    const file = req.file;

    // Debug: log the file object
    console.log("Uploaded file object:", file);

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const mimetype = file.mimetype || "application/octet-stream";

    try {
        let extractedText = '';

        // PDF handling
        if (mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(file.path);
            const data = await pdf(dataBuffer);
            extractedText = data.text;
        }

        // Image handling
        else if (
            mimetype === 'image/png' ||
            mimetype === 'image/jpeg' ||
            mimetype === 'image/jpg'
        ) {
            const result = await Tesseract.recognize(file.path, 'eng');
            extractedText = result.data.text;
        }

        // Unsupported file type
        else {
            fs.unlinkSync(file.path);
            return res.status(400).json({
                message: 'Only PDF and image files (jpeg, jpg, png) are supported.'
            });
        }

        await Upload.create({
            filename: file.originalname,
            fileType: mimetype,
            extractedText,
            uploadedBy: req.user.id,
            fileUrl: path.join('uploads', file.filename),
            filetype: mimetype
        });

        fs.unlinkSync(file.path);
        return res.status(200).json({ 
            message: 'File uploaded and processed',
            extractedText, });

    } catch (error) {
        console.error('Error processing file:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const fetch = async (req, res) => {
    try {
        const uploads = await Upload.find({ uploadedBy: req.user }).sort({ createdAt: -1 });
        res.status(200).json(uploads);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch uploads." });
    }
};


// This function handles the file upload, processes the file based on its type (PDF or image),
// extracts text using pdf-parse for PDFs and Tesseract.js for images, and saves the upload details to the database.
