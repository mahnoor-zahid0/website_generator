import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

/**
 * Replace placeholders in content with user data
 * Placeholders format: {{key}}
 */
export function replaceTemplatePlaceholders(content, userData) {
    let result = content;

    for (const [key, value] of Object.entries(userData)) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(placeholder, value || '');
    }

    return result;
}

/**
 * Process HTML files in template folder and replace placeholders
 */
export async function processTemplateFiles(templateFolder, userData, outputFolder) {
    try {
        // Ensure output folder exists
        await mkdir(outputFolder, { recursive: true });

        // Read all files in template folder
        const files = fs.readdirSync(templateFolder, { withFileTypes: true });

        for (const file of files) {
            const sourcePath = path.join(templateFolder, file.name);
            const destPath = path.join(outputFolder, file.name);

            if (file.isDirectory()) {
                // Recursively process directories
                await processTemplateFiles(sourcePath, userData, destPath);
            } else if (file.name.endsWith('.html')) {
                // Process HTML files
                const content = await readFile(sourcePath, 'utf-8');
                const processedContent = replaceTemplatePlaceholders(content, userData);
                await writeFile(destPath, processedContent, 'utf-8');
            } else {
                // Copy other files as-is
                fs.copyFileSync(sourcePath, destPath);
            }
        }
    } catch (error) {
        console.error('Error processing template files:', error);
        throw error;
    }
}

/**
 * Create ZIP file from folder
 */
export async function createZipFromFolder(sourceFolder, outputZipPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputZipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            resolve(outputZipPath);
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(sourceFolder, false);
        archive.finalize();
    });
}

/**
 * Generate website from template
 */
export async function generateWebsiteZip(templateFolderName, userData, userId, templateId) {
    try {
        const templatePath = path.join(process.cwd(), 'public', 'templates', templateFolderName);
        const timestamp = Date.now();
        const outputFolderName = `website_${userId}_${templateId}_${timestamp}`;
        const outputFolder = path.join(process.cwd(), 'public', 'generated', outputFolderName);
        const zipFileName = `${outputFolderName}.zip`;
        const zipPath = path.join(process.cwd(), 'public', 'generated', zipFileName);

        // Process template files
        await processTemplateFiles(templatePath, userData, outputFolder);

        // Create ZIP
        await createZipFromFolder(outputFolder, zipPath);

        // Clean up temp folder
        fs.rmSync(outputFolder, { recursive: true, force: true });

        return {
            zipPath: `/generated/${zipFileName}`,
            zipFileName,
        };
    } catch (error) {
        console.error('Error generating website:', error);
        throw error;
    }
}
