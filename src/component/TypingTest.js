import { Component } from "react";
import "../stylesheets/typing.css"

import text from  "../docs/englishWords.txt";
import { randomInt, round } from "mathjs";

/*
 * wordState states:
 * 0 - not active
 * 1 - active
 * 1 - correct
 * 2 - incorrect
 */

class TypingTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "Est ullamco quis id enim sunt dolor nostrud sint.",
            textLength: 50,
            topPopular: 500,
            startTime: -1,
            wpm: -1,
            minWordLength: 2,
            maxWordLength: 7,
            wordIndex: 0,
            wordState: [],
            charIndex: 0,
            wrong: false,
            wordList: [],
        }

        this.reset = this.reset.bind(this);
        this.onInputChangeHandle = this.onInputChangeHandle.bind(this);
        this.onKeyDownHandle = this.onKeyDownHandle.bind(this);
    }

    componentDidMount() { // Create word list from txt file
        fetch(text)
        .then(response => response.text())
        .then(data => {
            const { minWordLength, maxWordLength } = this.state;

            const wordList = data.split("\n").filter(function(t) {
                return minWordLength <= t.length && t.length < maxWordLength;
            }).slice(0,this.state.topPopular);

            var textArr = [], text = "";
            for(var i=0;i<this.state.textLength;++i) {
                var rand = randomInt(0, wordList.length);
                textArr.push(wordList[rand]);
            }
            text = textArr.join(" ");
            
            var wordState = [];
            for(i=0; i<text.split(" ").length; ++i) {
                wordState.push(0);
            }
            wordState[0] = 1;

            this.setState({wordList, text, wordState});
        });
    }

    onInputChangeHandle(e) {
        const txtArr = this.state.text.split(" ");
        const activeWord = txtArr[this.state.wordIndex];
        const value = e.target.value;
        var { wordState, wordIndex, wrong, textLength, startTime } = this.state;

        // Wrong state
        if(value.length > txtArr.length) wrong = true;
        else if(activeWord.slice(0,value.length) !== value) wrong = true;
        else wrong = false;

        // Is last word
        if(wordIndex === textLength - 1) {
            var wpm = -1;
            if(value === activeWord) {
                wordState[wordIndex] = 2;

                var t = new Date().getTime() / 1000;
                var d = t - startTime;

                wpm = round(textLength * 60 / d);
            }
            else
                wordState[wordIndex] = 3;
            
            this.setState({wpm, wordState});
        }

        // Is new word
        else if(value.slice(-1) === " ") {
            if(value === activeWord + " ")
                wordState[wordIndex] = 2;
            else
                wordState[wordIndex] = 3;
            
            wordIndex++;

            wordState[wordIndex] = 1;
            
            e.target.value = "";
            wrong = false;
            this.setState({wordIndex});
        }
        this.setState({wrong})
    }

    onKeyDownHandle(e) {
        if(e.code === "Escape")
            this.reset()
    }

    reset() {
        const { wordList } = this.state; 
        
        // Create random list of words
        var textArr = [], text = "";
        for(var i=0;i<this.state.textLength;++i) {
            var rand = randomInt(0, wordList.length);
            textArr.push(wordList[rand]);
        }
        text = textArr.join(" ");
        
        // Reset word state
        var wordState = [];
        for(i=0; i<text.split(" ").length; ++i) {
            wordState.push(0);
        }
        wordState[0] = 1;

        // Reset timer
        var startTime = new Date().getTime() / 1000;

        // Clear input
        document.getElementById("textInput").value = "";

        this.setState({wordIndex: 0, charIndex: 0, wpm: -1, wrong: false, wordState, text, startTime})
    }

    render() {
        const { text, wordIndex, wordState, wrong } = this.state;
        const txtArr = text.split(" ");

        const t = []

        wordState.forEach((state, index) => {
            var className = "";
            switch(state) {
                case 0:
                    className = ""
                    break;
                case 1:
                    className = "active";
                    break;
                case 2:
                    className = "correct";
                    break;
                case 3:
                    className = "wrong";
                    break;
                default:
                    break;
            }

            t.push(<span className={className} key={index}>{txtArr[index]} </span>)
        })
        
        const className = wrong ? "wrong" : "";

        return(
            <div className="typingMain" onKeyDown={this.onKeyDownHandle}>
                <div className="wpm" style={{marginTop:'auto'}}>WPM: {this.state.wpm}</div>
                <div className="sampleText">
                    <b>{t}</b>
                </div>
                <input ref="textInput"
                       name="search" 
                       type="input" 
                       autoComplete="off" 
                       autoCapitalize="off" 
                       autoCorrect="off"
                       autoSave="off"
                       id="textInput"
                       className={className}
                       onChange={this.onInputChangeHandle}/>
            </div>
        )
    }
} export default TypingTest;