import styled from 'styled-components';

// NOTE: Not all styles are listed here. Only the ones shared by more than one component.
// Styles that are specific to only one component are found on the component file.

const AppBottomOuterDiv = styled.div`
width: 50%;
background-color: #323845;
display: flex;
align-items: center;
flex-direction: column;
`

const AppBottomHeader = styled.header`
width: 95%;
padding 1%;
display: flex;
align-items: center;
justify-content: center;
background-color: #202630;
border-radius: 15px;
background: #202630;
box-shadow:  8px 8px 17px #1b2029, 
             -8px -8px 17px #252c37;
`
const AppBottomTitle = styled.h2`
color: #9d03fc;
`

const AppBottomBottomDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

export {
    AppBottomOuterDiv,
    AppBottomHeader,
    AppBottomTitle,
    AppBottomBottomDiv
}
