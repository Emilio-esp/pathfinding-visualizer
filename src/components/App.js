import React from 'react';
import Grid from "./Grid";
import '../styles/app.css'
import Toolbar from './Toolbar';
import Modal from './Modal';

const App = () => {
    return (
        <div >
            <Modal/>
            <Toolbar/>
            <Grid/>
        </div>
    );
}

export default App;
