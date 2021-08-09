import React, { Component } from 'react';
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";

import '../stylesheets/home.css';
// import { Console } from './Console';
import { Icon } from './Icon';
import Window from './Window';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            isDragging: false,
            dragID: '',
            dragAnchor: [0,0],
            objects: {
                '1': {point: [50,150], type: 'icon'},
                '2': {point: [50,350], type: 'icon'},
                '3': {point: [500,100], type: 'window'},
            },
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onMouseMove(e) {
        if(this.state.isDragging) {
            var { dragID, objects, dragAnchor } = this.state;
            if (dragID in objects) {
                objects[dragID].point = [e.nativeEvent.clientX-dragAnchor[0], e.nativeEvent.clientY-dragAnchor[1]];
            }

            this.setState({
                objects: objects,
            });
        }
    }

    onMouseDown(e) {
        console.log(e.currentTarget);
        const dragID = e.currentTarget.id;
        const { objects } = this.state;
        var anchorPoint = [e.nativeEvent.clientX,e.nativeEvent.clientY];
        if (dragID in objects) {
            anchorPoint[0] -= objects[dragID].point[0]
            anchorPoint[1] -= objects[dragID].point[1]
        }

        this.setState({isDragging: true, dragID: dragID, dragAnchor: anchorPoint});
    }

    onMouseUp(e) {
        this.setState({isDragging: false, dragID: ''});
    }

    onClose(id) {
        console.log(id);
        const { objects } = this.state;
        if (id in objects)
            delete objects[id]
        // console.log(objects);
        this.setState({objects: objects});
    }

    render() {
        const { objects } = this.state;
        var icons = [];
        var windows = [];
        for(var i in objects) {
            if(objects[i].type === 'icon')
                icons.push([i,...objects[i].point]);
            else
                windows.push([i,...objects[i].point]);
        }

        const iconObj = icons.map(coord => {
            return (<Icon key={coord[0]} id={coord[0]} left={coord[1]} top={coord[2]} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>);
        });

        const windowObj = windows.map(coord => {
            return (<Window key={coord[0]} id={coord[0]} left={coord[1]} top={coord[2]} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onClose={this.onClose}/>);
        });

        return (
        <>
        <BrowserView key={1}>
            <div className="mainContent" id="mainContainer" onMouseMove={this.onMouseMove}>
                <h1 style={{textAlign:'center', pointerEvents:'none'}}>Howdy!</h1>

                {iconObj}
                {windowObj}

            </div>
        </BrowserView>
        <MobileView key={2}>
        <div className="mainContent" id="mainContainer">
            <h1>IS MOBILE</h1>
        </div>
        </MobileView>
        </>
        );
    }
}
export default Home;