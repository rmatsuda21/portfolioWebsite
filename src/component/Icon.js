import { Component } from "react";
import icon from '../icons/ie.png';

export class Icon extends Component{
    render() {
        return(
        <div className="icon">
            <img src={icon}/>
            <a>Internet Explorer</a>
        </div>
        );
    }
}