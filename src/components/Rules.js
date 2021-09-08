import React from 'react';
import styled from 'styled-components';
import { AppBottomBottomDiv, AppBottomHeader, AppBottomOuterDiv, AppBottomTitle } from "../util/Styles"

const BulletList = styled.ul`
    margin-top: 8%;
    padding: 5% 10% 5% 10%;
    color: #9d03fc;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border-radius: 15px;
    background: #323845;
    box-shadow: inset 6px 6px 12px #2b303b, 
                inset -6px -6px 12px #3a404f;
`


function Rules() {
    return (
        <AppBottomOuterDiv>
            <AppBottomHeader><AppBottomTitle>Rules</AppBottomTitle></AppBottomHeader>
            <AppBottomBottomDiv>
                <BulletList>
                    <li>Any live cell with two or three live neighbours survives.</li>
                    <li>Any dead cell with three live neighbours becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                </BulletList>
            </AppBottomBottomDiv>    
        </AppBottomOuterDiv>
    );
}

export default Rules;