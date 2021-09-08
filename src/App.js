import React from 'react';
import styled from 'styled-components';
import Rules from './components/Rules';
import About from './components/About';
import Grid from './components/Grid';

const Header = styled.header`
    padding .1%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: #202630;
    box-shadow:  13px 13px 25px #1b2029, 
             -13px -13px 25px #252c37;
`
const Title = styled.h1`
    color: #9d03fc;
`

const BottomDiv = styled.div`
    display: flex;
    justify-content: center;
`

const AppDiv = styled.div`
    background: #323845;
`

function App() {
    return (
        <AppDiv>
            <Header><Title>Conway's Game of Life</Title></Header>
            <Grid/>
            <BottomDiv>
                <Rules/>
                <About/>
            </BottomDiv>
        </AppDiv>
    );
}

export default App;
