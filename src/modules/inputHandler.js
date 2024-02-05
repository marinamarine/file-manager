import { systemInfo } from './systemInfo.js';
import { list, navigation, navigationUp } from './navigation.js';

const getOperationHandler = (operationCode) => {
    const operationHandlers = new Map([
        ['up', navigationUp],
        ['cd', navigation],
        ['ls', list],
        ['os', systemInfo],
    ]);
    return operationHandlers.get(operationCode);
};

export const inputHandler = async (basePath, input) => {
    const [code, args] = input.replace( /\s\s+/g, ' ' ).split(' ');
    const operation = getOperationHandler(code);
    if (!operation) {
        throw new Error('Invalid input');
    }

    return await operation(basePath, args);
};
