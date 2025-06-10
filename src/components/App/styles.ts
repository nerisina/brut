import styled from "styled-components"; 

export const Contianer = styled.div`
    display: flex;
    border-top: 2px solid #000;
    justify-content: space-around;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

export const TrackView = styled.div`
display:flex;
flex-direction: column;
justify-content: space-between;
`;

export const Side = styled.div`
    min-width;30vw;
    position: sticky;
    border-left: 2px solid #000;
    padding: 0 8px;
`;
