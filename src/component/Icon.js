import { Component } from "react";
import icon from '../icons/ie.png';
import resume from '../icons/resume.png';
import console from '../icons/console.png';
import snake from '../icons/snake.png';

export class Icon extends Component {
    render() {
        var img;
        switch(this.props.icon) {
            case 'resume':
                img = <img src={resume} alt="Icon img"/>;
                break;
            case 'console':
                img = <img src={console} alt="Icon img"/>;
                break;
            case 'snake':
                img = <img src={snake} alt="Icon img"/>;
                break;
            default:
                img = <img src={icon} alt="Icon img"/>;
        }
        return(
        <div className="icon"
                id={this.props.id}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
                style={{top:this.props.top, left:this.props.left}}>
            {img}
            {this.props.text}
        </div>
        );
    }
}