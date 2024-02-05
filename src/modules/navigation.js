import path from 'node:path';
import fs from 'node:fs/promises';
import { isDirExist } from './utils.js';

export const navigationUp = async (basePath) => {
    const newPath = path.join(basePath, '..');

    return newPath;
};

export const navigation = async (basePath, args) => {
    if (!args) {
        throw new Error('Invalid input');
    }
    const newPath = path.join(basePath, args);
    if (!(await isDirExist(newPath))) {
        throw new Error('Invalid input');
    }

    return newPath;
};

export const list = async (basePath, _args) => {
    const data = await fs.readdir(basePath, {
        withFileTypes: true,
        recursive: true,
    });
    if (!data) {
        throw new Error('Operation failed');
    }

    const listData = data
        .sort(
            (a, b) =>
                b.isDirectory() - a.isDirectory() ||
                a.name.localeCompare(b.name),
        )
        .map((item) => {
            return {
                name: item.name,
                type: item.isDirectory() ? 'directory' : 'file',
            };
        });
    console.table(listData);
    return basePath;
};
