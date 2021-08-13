import { Component } from "react";
import '../stylesheets/window.css';
import { Console } from "./Console";
import resume from '../docs/Matsuda_Resume.pdf';

export class Window extends Component {
    render() {
        var content;
        var openBtn;

        switch(this.props.windowType) {
            case 'url': 
                content = (<iframe src={this.props.url} title={'Window'}/>); 
                openBtn = (<div className='openBtn' title="Open in New Tab" onClick={() => {window.open(this.props.url)}}>O</div>)
                break;
            case 'resume': 
                content = (<object data={resume} type="application/pdf">Resume</object>); 
                openBtn = (<div className='openBtn' title="Open in New Tab" onClick={() => {window.open(resume)}}>O</div>)
                break;
            case 'console': 
                content = (<Console/>); 
                openBtn = null;
                break;
            case 'intro':
                content = (<div style={{flexGrow: 1, backgroundColor: "white", color: "black", padding: '1em'}}>
                            <h3 style={{textAlign:'center'}}>Welcome to Re:OS</h3>
                            <p style={{textAlign:'center'}}>Interactive portfolio built by: Reo Matsuda</p>
                            <p style={{textAlign:'center'}}>Come back for more updates</p>
                           </div>);
                openBtn = null;
                break;
            default: content = null; console.log(`Error: Unknown type: ${this.props.windowType}`);
        }

        return (
            <div className='window' 
                 style={{top: this.props.top, left: this.props.left, zIndex: this.props.zIndex}}>
                <div className='border'
                     onMouseDown={this.props.onMouseDown}
                     onMouseUp={this.props.onMouseUp}
                     id={this.props.id}
                >
                    <span unselectable='on'>{this.props.title}</span>
                    {openBtn}
                    <div className='closeBtn' title="Close" onClick={() => {this.props.onClose(this.props.id)}}>X</div>
                </div>
                <div className='content' style={{backgroundColor:"black"}}>
                    {content}
                </div>
            </div>
        );
    }
}