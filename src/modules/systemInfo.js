import os from 'node:os';
import { printLine, printErrorLine } from './utils.js';

export const systemInfo = async (basePath, args) => {
    const operationHandlers = new Map([
        [
            '--EOL',
            () => {
                printLine(os.EOL);
            },
        ],
        [
            '--homedir',
            () => {
                printLine(os.homedir());
            },
        ],
        [
            '--username',
            () => {
                printLine(os.userInfo().username);
            },
        ],
        [
            '--architecture',
            () => {
                printLine(os.arch());
            },
        ],
        [
            '--cpus',
            () => {
                const amount = os.cpus().length;
                printLine(`Amount of CPUS: ${amount}`);
                const cpusInfo = os.cpus().map((item) => {
                    const { model, speed } = item;
                    return { model, speed: `${speed / 1000}GHz` };
                });
                console.table(cpusInfo);
            },
        ],
    ]);
    const operation = operationHandlers.get(args);
    if (!operation) {
        throw new Error('Invalid input');
    }
    operation();
    return basePath;
};
