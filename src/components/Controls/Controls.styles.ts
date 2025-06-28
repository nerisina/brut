import styled from "styled-components";

export const ControlsContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
border-top: 2px solid #000;
padding: 20px;
}`
export const PlaylistButton = styled.button`
        width: 50px;
        height: 50px;
        background-color: #1DB954;               
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin: 0 10px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 16px;
        &:hover {
            background-color: #1ed760;                  
            }
        &:disabled {
            background-color: #282828;
            cursor: not-allowed;
        }
`;
              