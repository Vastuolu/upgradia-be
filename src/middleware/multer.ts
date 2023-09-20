import multer from 'multer';
import { Request, Response, NextFunction } from 'express'
import path from 'path';

// Define the Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // File naming strategy
  },
});

// Create and configure the Multer instance
const upload = multer({ storage });

// Function to handle file uploads and return file paths
export function uploadFile(req:Request, res: Response, next: NextFunction) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }
    // Extract the file path and return it
    const filePath = req.file?.path;
    res.locals.filePath = filePath; // Store the file path in response locals
    next();
  });
}
