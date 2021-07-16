import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        this.fetchTest();
    }

    fetchTest = () => {
        fetch('/grades')
        .then(res => res.json())
        .then(res => this.setState({ courses: res.courses }))
    }

    render() {
        const { courses } = this.state;
        return (
        <div>
            {courses.map(course => (
                <h1>{course.prefix}-{course.course}-{course.section}</h1>
            ))}
        </div>
        );
    }
}
export default Test;