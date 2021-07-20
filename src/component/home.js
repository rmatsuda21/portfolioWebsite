import React, { Component } from 'react';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

import '../stylesheets/home.css';
import { Console } from './Console';

// import Star from './star';

// function Stars() {
//     var stars = []
//     for(let i=0; i<(Math.floor(Math.random() * 10) + 50); ++i) {
//         var t = Math.floor(Math.random() * 80) + 5;
//         var l = Math.floor(Math.random() * 90) + 5;
//         var w = Math.floor(Math.random() * 3) + 5
//         var c = Math.round(Math.random());
//         var col = c ? 'var(--contrast)' : 'var(--highlight)';
//         var stroke = c ? 'var(--highlight)' : 'var(--contrast)';
//         stars.push(<Star key={i} fill={col} width={w+'vw'} position='absolute' top={t+'vh'} left={l+'vw'} bottom='' right=''/>)
//     }
//     return stars;
// }

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