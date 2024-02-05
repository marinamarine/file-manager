import path from 'node:path';
import * as fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import { printErrorLine, printLine } from './utils.js';

export const readFile = async (basePath, args) => {
    const filePath = path.join(basePath, args);
    try {
        const file = await fsPromises.open(filePath);
    } catch {
        throw new Error('Operation failed');
    }

    for await (const line of file.readLines()) {
        printLine(line);
    }

    return basePath;
};

export const createFile = async (basePath, args) => {
    const filePath = path.join(basePath, args);

    fs.open(filePath, 'wx', function (err, file) {
        if (err) {
            printErrorLine('Operation failed: file already exist');
        }
    });
    return basePath;
};

export const deleteFile = async (basePath, args) => {
    const filePath = path.join(basePath, args);
    try {
        await fsPromises.unlink(filePath);
    } catch {
        throw new Error('Operation failed');
    }
    return basePath;
};
