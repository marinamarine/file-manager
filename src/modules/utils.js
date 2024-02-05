import process from 'node:process';
import os from 'node:os';
import fs  from 'node:fs/promises';

export const printLine = (line, color) => {
    const chosenColor = color || 'green';
    const colors = {
        green: [32, 89],
        cyan: [36, 89],
    };
    
    process.stdout.write(
        `\x1b[${colors[chosenColor][0]}m${line}${os.EOL}\x1b[${
            colors[chosenColor][1]
        }m`,
    );
};

export const printErrorLine = (line) => {
    process.stdout.write(`\x1b[31m${line}${os.EOL}\x1b[39m`);
};

export const getUserName = (args) => {
    for (let arg of args) {
        if (!arg.startsWith('--username')) {
            continue;
        }
        return arg.split('=')[1] ?? 'Username';
    }
    return 'Username';
};

export const isDirExist = async (path) => {
    try {
        const stats = await fs.stat(path);

        if (stats.isDirectory()) {
            return true;
        }
    } catch {
        throw new Error('Invalid input')
    }
    return false;
};
