import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { printLine } from './utils.js';

export const calculateHash = async (basePath, args) => {
    if (!args) {
        throw new Error('Invalid input');
    }
    const filePath = path.join(basePath, args);

    const hash = crypto.createHash('sha256');
    const readableStream = fs.createReadStream(filePath, 'utf8');
    let sha256String = '';

    readableStream.pipe(hash);

    hash.on('data', (chunk) => {
        sha256String += chunk.toString('hex');
    });

    hash.on('end', () => {
        printLine(sha256String);
    });
    return basePath;
};
