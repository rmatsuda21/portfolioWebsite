import { useState, useEffect } from "react";
// Usage
export function Console() {

    // Call our hook for each key that we'd like to monitor
    const [history, setHistory] = useState([]);
    const [text, setText] = useState("");
    const [pos, setPos] = useState(0);

    const [sText, setSText] = useState("");
    const [cText, setCText] = useState(" ");
    const [nText, setNText] = useState("");

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

    const downHandler = ({ key }) => {
        console.log(key);
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
            setHistory(prevHistory => [...prevHistory, text]);
            setText('');
            setPos(0);

            updateText('',0);
        }
        else if(key.length === 1 && /[0-9a-zA-Z{ }]/.test(key)){
            addChar(key);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    });

    const lines = history.map((line) => {
        return <><span>&gt;{line}</span><br/></>;
    });

    return (
        <div style={{whiteSpace:'pre'}}>
            {lines}
            &gt;<span>{sText}</span><span style={{backgroundColor:'white',color:'black'}}>{cText}</span><span>{nText}</span>
        </div>
    );
}