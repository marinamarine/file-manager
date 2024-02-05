import process from 'node:process';
import os from 'node:os';
import readline from 'node:readline/promises';
import { printLine, getUserName, printErrorLine } from './modules/utils.js';
import { inputHandler } from './modules/inputHandler.js';

const fileManager = async () => {
    let currentPath = os.homedir();
    const userName = getUserName(process.argv);

    printLine(`Welcome to the File Manager, ${userName}!`, 'cyan');
    printLine(`You are currently in ${currentPath}`, 'cyan');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.prompt();

    rl.on('line', async (line) => {
        const input = line.trim();

        if (input === '.exit') {
            rl.close();
            return;
        }
        try {
            currentPath = await inputHandler(currentPath, input);
        } catch (err) {
            printErrorLine(err?.message || err);
        }
        printLine(`You are currently in ${currentPath}`, 'cyan');
        rl.prompt();
    });

    rl.on('SIGINT', () => {
        rl.close();
    });

    rl.on('close', () => {
        printLine(
            `Thank you for using File Manager, ${userName}, goodbye!`,
            'cyan',
        );
    });
};

await fileManager();
