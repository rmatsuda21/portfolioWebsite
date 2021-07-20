import React, { Component } from 'react';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

import '../stylesheets/home.css';
import { Console } from './Console';

class Home extends Component {
    render() {
        return (
        <>
        <BrowserView>
        <div className="mainContent" id="mainContainer">
            <h1>Howdy!</h1>
            <h3>This site is still WIP, please check back later</h3>
            <p>
                ------------------------------<br/>
                ______________________________<br/><br/><br/>
                ¯\_(^^)_/¯<br/>
            </p>
            <Console/>
        </div>
        </BrowserView>
        <MobileView>
        <div className="mainContent" id="mainContainer">
            <h1>IS MOBILE</h1>
        </div>
        </MobileView>
        </>
        );
    }
}
export default Home;