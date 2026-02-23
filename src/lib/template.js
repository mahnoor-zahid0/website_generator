import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import AdmZip from 'adm-zip';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

/**
 * Extract ZIP file to destination
 */
export async function extractZip(zipBuffer, destFolder) {
    try {
        const zip = new AdmZip(zipBuffer);
        zip.extractAllTo(destFolder, true);
        return true;
    } catch (error) {
        console.error('Error extracting ZIP:', error);
        throw error;
    }
}

/**
 * Validate template structure
 * Must have: index.html, preview.png
 */
export function validateTemplateStructure(templateFolder) {
    const requiredFiles = ['index.html', 'preview.png'];

    for (const file of requiredFiles) {
        const filePath = path.join(templateFolder, file);
        if (!fs.existsSync(filePath)) {
            return { valid: false, missing: file };
        }
    }

    return { valid: true };
}

/**
 * Save uploaded file
 */
export async function saveUploadedFile(file, uploadDir) {
    try {
        await mkdir(uploadDir, { recursive: true });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);
        return filePath;
    } catch (error) {
        console.error('Error saving file:', error);
        throw error;
    }
}
