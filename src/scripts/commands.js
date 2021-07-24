const echo = (commands) => {
    var restOfCommand = ''
    for(var i=1;i<commands.length;++i) {
        restOfCommand += String(commands[i]) + ' ';
    }
    return [restOfCommand];
}

const help = (commands) => {
    var helpTextArr = []
    for(let command in commandDict) {
        if(command in helpText)
            helpTextArr.push(`${command}: ${helpText[command]}`);
        else
            helpTextArr.push(`${command}: NO HELP TEXT`);
    }
    return helpTextArr;
}

const helpText = {
    'help': 'Get list of all commands',
    'echo': 'I will talk back to you!',
}

const commandDict = {
    'help': help,
    'echo': echo,
}

export function parseCommand(text) {
    var commands = String(text).split(' ');
    if(commands[0] in commandDict) {
        return commandDict[commands[0]](commands);
    }
    return [`${commands[0]}: command not found. To see a list of commands use help`];
}