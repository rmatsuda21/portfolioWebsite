import React, { Component } from 'react';

import '../stylesheets/home.css';

import Cloud from './cloud';
import Star from './star';

function Stars() {
    var stars = []
    for(let i=0; i<(Math.floor(Math.random() * 10) + 50); ++i) {
        var t = Math.floor(Math.random() * 80) + 5;
        var l = Math.floor(Math.random() * 90) + 5;
        var w = Math.floor(Math.random() * 3) + 5
        var c = Math.round(Math.random());
        var col = c ? 'var(--contrast)' : 'var(--highlight)';
        var stroke = c ? 'var(--highlight)' : 'var(--contrast)';
        stars.push(<Star key={i} fill={col} width={w+'vw'} position='absolute' top={t+'vh'} left={l+'vw'} bottom='' right=''/>)
    }
    return stars;
}

class Home extends Component {
    render() {
        return (
        <div className="mainContent">
            {/* <p>
            &nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__<br/>
            |&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;/__&nbsp;&nbsp;/&nbsp;/________&nbsp;&nbsp;____&nbsp;___&nbsp;&nbsp;___&nbsp;<br/>
            |&nbsp;|&nbsp;/|&nbsp;/&nbsp;/&nbsp;_&nbsp;\/&nbsp;/&nbsp;___/&nbsp;__&nbsp;\/&nbsp;__&nbsp;`__&nbsp;\/&nbsp;_&nbsp;\<br/>
            |&nbsp;|/&nbsp;|/&nbsp;/&nbsp;&nbsp;__/&nbsp;/&nbsp;/__/&nbsp;/_/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;&nbsp;__/<br/>
            |__/|__/\___/_/\___/\____/_/&nbsp;/_/&nbsp;/_/\___/<br/>                     
            </p> */}
            <p>
            ██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;███████&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████&nbsp;&nbsp;██████&nbsp;&nbsp;███&nbsp;&nbsp;&nbsp;&nbsp;███&nbsp;███████<br/>
            ██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;████&nbsp;&nbsp;████&nbsp;██<br/>
            ██&nbsp;&nbsp;█&nbsp;&nbsp;██&nbsp;█████&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;████&nbsp;██&nbsp;█████<br/>
            ██&nbsp;███&nbsp;██&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;██&nbsp;&nbsp;██&nbsp;&nbsp;██&nbsp;██<br/>
            &nbsp;███&nbsp;███&nbsp;&nbsp;███████&nbsp;███████&nbsp;&nbsp;██████&nbsp;&nbsp;██████&nbsp;&nbsp;██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██&nbsp;███████<br/>
            </p>
            <h3>This site is still WIP, please check back later</h3>
            <p>
                ------------------------------<br/>
                ______________________________<br/><br/><br/>
                ¯\_(^^)_/¯<br/>
            </p>
            {/* <Cloud fill='var(--secondary)' width='25vw' position='absolute' top='' left='48vw' bottom='-1vw' right='' stroke='var(--contrast)'/>
            <Cloud fill='var(--secondary)' width='30vw' position='absolute' top='' left='' bottom='-3vw' right='49vw' stroke='var(--contrast)'/>
            <Cloud fill='var(--secondary)' width='60vw' position='absolute' top='' left='-25vw' bottom='-10vw' right='' stroke='var(--contrast)'/>
            <Cloud fill='var(--secondary)' width='50vw' position='absolute' top='' left='' bottom='-10vw' right='-15vw' stroke='var(--contrast)'/>
            <Stars/> */}
            {/* <Star fill='var(--secondary)' width='8vw' position='absolute' top='15vw' left='' bottom='' right='15vw' stroke='var(--contrast)'/>
            <Star fill='var(--secondary)' width='6vw' position='absolute' top='25vw' left='' bottom='' right='15vw' stroke='var(--contrast)'/>
            <Star fill='var(--secondary)' width='7vw' position='absolute' top='35vw' left='' bottom='' right='15vw' stroke='var(--contrast)'/>
            <Star fill='var(--secondary)' width='8vw' position='absolute' top='19vw' left='' bottom='' right='15vw' stroke='var(--contrast)'/>
            <Star fill='var(--secondary)' width='6vw' position='absolute' top='22vw' left='' bottom='' right='15vw' stroke='var(--contrast)'/> */}
        </div>
        );
    }
}
export default Home;