import { Component } from "react";
import icon from '../icons/ie.png';

export class Icon extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.onDrag = this.onDrag.bind(this);
        
    //     this.state = {
    //         top: 300,
    //         left: 250,
    //         mouseX: 0,
    //         mouseY: 0,
    //         mouseDown: false
    //     }
    // }

    // componentDidMount() {
    //     this.setState({top: this.props.top, left: this.props.left});
    // }

    render() {
        return(
        <div className="icon"
                id={this.props.id}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
                style={{top:this.props.top, left:this.props.left}}>
            <img src={icon} alt="Icon img"/>
            <a>Internet Explorer</a>
        </div>
        );
    }
}