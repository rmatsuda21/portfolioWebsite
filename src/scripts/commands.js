import { evaluate } from "mathjs";

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

const clear = (commands, setDisplay) => {
    setDisplay([]);
    return [];
}

const evalComm = (commands) => {
    var restOfCommand = commands.slice(1).join(' ');
    try {
        console.log(evaluate(restOfCommand));
        try {
            return [String(evaluate(restOfCommand))];
        } catch(err) {
            return [String(err)];
        }
    } catch(err) {
        console.log(err);
        return [String(err)];
    }
    // console.log(String(restOfCommand));
    // console.log(/^[-+/*%=()[0-9]]*$/.test(restOfCommand));
    // if(!/\d*/.test(restOfCommand))
    //     return ['Invalid Input!'];
    // try {
    //     // eslint-disable-next-line
    //     return [eval(restOfCommand)];
    // } catch (err) {
    //     return ['Syntax Error!'];
    // }
}

const goto = (commands) => {
    window.location.href = commands[1];
    return ['Empty'];
}

const helpText = {
    'help': 'Get list of all commands',
    'echo': 'I will talk back to you!',
    'eval': 'Let me do your math :D',
    'goto': 'Visit my other sites.',
    'clear': 'Clear display',
}

const commandDict = {
    'help': help,
    'echo': echo,
    'eval': evalComm,
    'goto': goto,
    'clear': clear,
}

export function parseCommand(text, setDisplay) {
    if(text.trim() === '') {
        return [];
    }

    var commands = String(text).split(' ');
    if(commands[0] in commandDict) {
        if(commands[0] === 'clear')
            return commandDict[commands[0]](commands, setDisplay);
        return commandDict[commands[0]](commands);
    }
    return [`${commands[0]}: command not found. To see a list of commands use help`];
}