import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/home.css';

import Cloud from './cloud';

class Home extends Component {
    render() {
        return (
        <div className="App">
            <h1>Hi :D</h1>
            <h3>This site is still WIP, please check back later</h3>
            <Cloud fill='var(--secondary)' width='25vw' position='absolute' top='' left='48vw' bottom='-1vw' right='' stroke='var(--contrast)'/>
            <Cloud fill='var(--secondary)' width='30vw' position='absolute' top='' left='' bottom='-3vw' right='49vw' stroke='var(--contrast)'/>
            <Cloud fill='var(--secondary)' width='60vw' position='absolute' top='' left='-25vw' bottom='-10vw' right='' stroke='var(--contrast)'/>
            <Cloud fill='var(--secondary)' width='50vw' position='absolute' top='' left='' bottom='-10vw' right='-15vw' stroke='var(--contrast)'/>
        </div>
        );
    }
}
export default Home;