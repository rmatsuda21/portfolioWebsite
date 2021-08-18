import { Component } from "react";
import logo from '../icons/logo.png';

export class Taskbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()})
    }

    render() {
        var { date } = this.state;
        var dateArr = date.toString().split(' ');

        var time = dateArr.slice(4,5).join(), day = dateArr.slice(0,3).join(' '); 
        return (
            <div className='taskbar'>
                <img src={logo} alt=""></img>
                <div className='container'>
                    hi
                </div>
                <span className='time'>
                    {day}<br/>
                    {time}
                </span>
            </div>
    )}
}
export default Taskbar;