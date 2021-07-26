import { Component } from "react";
import icon from '../icons/ie.png';

export class Icon extends Component{
    constructor(props) {
        super(props);
        // this.onDrag = this.onDrag.bind(this);
        
        this.state = {
            top: 100,
            left: 0,
            mouseDown: false
        }
    }

    onMouseMove = () => {
        if(this.state.mouseDown) {
            this.setState({top: this.props.state.y,left: this.props.state.x});
        }
    }

    render() {
        return(
        <div className="icon" onClick={this.props.onClick} 
                onMouseMove={this.onMouseMove} 
                onMouseDown={() => this.setState({mouseDown: true})} 
                onMouseUp={() => this.setState({mouseDown: false})} 
                style={{top:this.state.top, left:this.state.left, pointerEvents:'none'}}>
            <img src={icon} alt="Icon img"/>
            <a>{this.props.state.x}, {this.props.state.y}</a>
        </div>
        );
    }
}