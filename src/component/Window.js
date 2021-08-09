import { Component } from "react";
import '../stylesheets/window.css';
import { Console } from "./Console";

export class Window extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className='window' 
                 style={{top: this.props.top, left: this.props.left}}>
                <div className='border'
                     onMouseDown={this.props.onMouseDown}
                     onMouseUp={this.props.onMouseUp}
                     id={this.props.id}
                     >
                    <span>Title Here</span>
                    <div className='openBtn' onClick={() => {window.open(this.props.url)}}><a>O</a></div>
                    <div className='closeBtn' onClick={() => {this.props.onClose(this.props.id)}}><a>X</a></div>
                </div>
                <div className='content' style={{backgroundColor:"black"}}>
                    {/* <iframe title='content' src={this.props.url}/> */}
                    <Console></Console>
                </div>
            </div>
        );
    }
}
export default Window;