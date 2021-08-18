import React, { useState, useEffect } from "react";
import { parseCommand } from "../scripts/commands";

export function Console() {
    const MAX_HIST = 100;
    const MAX_DISP = 30;

    const [history, setHistory] = useState([]);
    const [display, setDisplay] = useState([]);
    const [text, setText] = useState("");
    const [pos, setPos] = useState(0);

    const [sText, setSText] = useState("");
    const [cText, setCText] = useState(" ");
    const [nText, setNText] = useState("");

    const [histIndex, setHistIndex] = useState(-1);
    const [origText, setOrigText] = useState('');

    // TODO: Make sure keyboard input is only taken if window is 'active'
    // eslint-disable-next-line
    const [isActice, setIsActive] = useState(false);

    function updateText(t, p){
        var s, c, n;
        s = (t.slice(0,p));
        if(p < t.length)
            c = (t.slice(p, p+1));
        else
            c = (' ');
        if(p < t.length - 1)
            n = (t.slice(p+1, t.length));
        else
            n = ('');

        setSText(s);
        setCText(c);
        setNText(n);
    }

    function addChar(c) {
        var newText = text.slice(0,pos) + c + text.slice(pos);
        var newPos = pos + 1;
        setText(newText);
        setPos(newPos);
        
        updateText(newText, newPos);
    }

    function getHistory(index) {
        if(index === -1) return origText;

        return String(history[history.length - 1 - index]);
    }

    const downHandler = ({ key }) => {
        if(key === 'ArrowLeft') {
            if(pos > 0) {
                setPos(pos - 1);
                updateText(text, pos - 1);
            }
        }
        else if(key === 'ArrowRight') {
            if(pos < text.length) {
                setPos(pos + 1);
                updateText(text, pos + 1);
            }
        }
        else if(key === 'ArrowUp') {
            if(histIndex >= MAX_HIST || histIndex >= history.length-1) return;
            if(histIndex === -1) setOrigText(text);

            setHistIndex(histIndex+1);
            let hist = getHistory(histIndex+1);

            setText(hist);
            setPos(Math.min(pos, hist.length));
            updateText(hist, Math.min(pos, hist.length));
        }
        else if(key === 'ArrowDown') {
            if(histIndex === -1) return;

            setHistIndex(histIndex-1);
            let hist = getHistory(histIndex-1);
            
            setText(hist);
            setPos(Math.min(pos, hist.length));
            updateText(hist, Math.min(pos, hist.length));
        }
        else if(key === 'Backspace') {
            if(pos > 0) {
                var newText = text.slice(0,pos-1) + text.slice(pos);
                var newPos = pos - 1;
                setText(newText);
                setPos(newPos);
                
                updateText(newText, newPos);
            }
        }
        else if(key === 'Enter') {
            var comm = text.trimEnd();
            if(comm !== '') {
                if(history.length >= MAX_HIST)
                    setHistory(prevHistory => [...(prevHistory.slice(1)), comm]);
                else
                    setHistory(prevHistory => [...prevHistory, comm]);
            }
            const parsedCommand = parseCommand(comm, setDisplay);

            if(display.length + parsedCommand.length + 1 > MAX_DISP) {
                const overflow = (display.length + parsedCommand.length + 1) - MAX_DISP;
                setDisplay(prevDisp => [...(prevDisp.slice(overflow))]);
            }

            if(comm !== 'clear')
                setDisplay(prevDisp => [...prevDisp, '>'+comm]);
            parsedCommand?.forEach(t => {
                setDisplay(prevDisp => [...prevDisp, t]);
            });

            setText('');
            setPos(0);

            updateText('',0);
            setHistIndex(-1);
        }
        else if(key.length === 1 && /[!@#$%^&*()-=_+[\]{}|\\~`'";:,.<>/?0-9a-zA-Z{ }]/.test(key)){
            addChar(key);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    });

    const lines = display.map((line, index) => {
        return <React.Fragment key={index}><pre key={index*2}>{line}</pre><br key={index*2+1}/></React.Fragment>;
    });

    return (
        <div className="console">
            {lines}
            <React.Fragment key={-1}>&gt;<pre>{sText}</pre><pre className='current' style={{backgroundColor:'white',color:'black'}}>{cText}</pre><pre >{nText}</pre></React.Fragment>
        </div>
    );
}