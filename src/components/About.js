import React from 'react';
import styled from 'styled-components';
import { AppBottomBottomDiv, AppBottomHeader, AppBottomOuterDiv, AppBottomTitle } from "../util/Styles"

const P = styled.p`
    margin-top: 5%;
    width: 70%;
    padding: 3%;
    color: #9d03fc;
    text-align: center;
    border-radius: 15px;
    background: #323845;
    box-shadow: inset 6px 6px 12px #2b303b, 
                inset -6px -6px 12px #3a404f;
`

function About() {
    return (
        <AppBottomOuterDiv>
            <AppBottomHeader><AppBottomTitle>About</AppBottomTitle></AppBottomHeader>
            <AppBottomBottomDiv>
                <P>
                This is a game originally made by John Horton Conway. 
                It is a zero player game where you simply put initial input, hit start and observe. 
                It is supposed to mimic life and its randomness. Some patterns remain still, some 
                repeat endlessly, and others eventually end. It is considered turing complete 
                because it is a system that is able to recognize or decide other data-manipulation 
                rule sets.
                </P>
            </AppBottomBottomDiv>
        </AppBottomOuterDiv>
    );
}

export default About;