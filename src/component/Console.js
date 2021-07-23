import { useState, useEffect } from "react";

export function Console() {
    const MAX_HIST = 100;
    const MAX_DISP = 30;

    // Call our hook for each key that we'd like to monitor
    const [history, setHistory] = useState([]);
    const [display, setDisplay] = useState([]);
    const [text, setText] = useState("");
    const [pos, setPos] = useState(0);

    const [sText, setSText] = useState("");
    const [cText, setCText] = useState(" ");
    const [nText, setNText] = useState("");

    const [histIndex, setHistIndex] = useState(-1);
    const [origText, setOrigText] = useState('');

    function updateText(text, pos){
        var s, c, n;
        s = (text.slice(0,pos));
        if(pos < text.length)
            c = (text.slice(pos, pos+1));
        else
            c = (' ');
        if(pos < text.length - 1)
            n = (text.slice(pos+1, text.length));
        else
            n = ('');

        // console.log(pos);
        // console.log('S:' + s + ' | C:' + c + ' | N:' + n);

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
            if(history.length >= MAX_HIST)
                setHistory(prevHistory => [...(prevHistory.slice(1)), '>'+text]);
            else
                setHistory(prevHistory => [...prevHistory, '>'+text]);
            console.log(history);
            
            setText('');
            setPos(0);

            updateText('',0);
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

    const lines = history.slice(Math.max(0,history.length-MAX_DISP),history.length).map((line, index) => {
        return <><span key={index}>{line}</span><br/></>;
    });

    return (
        <div style={{whiteSpace:'pre'}}>
            {lines}
            &gt;<span>{sText}</span><span style={{backgroundColor:'white',color:'black'}}>{cText}</span><span>{nText}</span>
        </div>
    );
}