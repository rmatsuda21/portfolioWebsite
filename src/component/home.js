import React, { Component } from 'react';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

import '../stylesheets/home.css';
import { Console } from './Console';
import { Icon } from './Icon';

class Home extends Component {
    render() {
        return (
        <>
        <BrowserView key={1}>
        <Icon/>
        <div className="mainContent" id="mainContainer">
            <h1 style={{textAlign:'center'}}>Howdy!</h1>
            <h3>This site is still WIP, please check back later</h3>
            <p>
                -----------------------------------------------<br/>
                ¯\_(^^)_/¯<br/><br/>
            </p>
            <Console/>
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