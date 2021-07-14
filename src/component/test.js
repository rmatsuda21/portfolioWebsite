import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        this.fetchTest();
    }

    fetchTest = () => {
        fetch('/ping')
        .then(res => res.json())
        .then(res => this.setState({ message: res }))
    }

    render() {
        const { message } = this.state;
        return (
        <div>
            <h1>{message}</h1>
        </div>
        );
    }
}
export default Test;