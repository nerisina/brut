import { styled, keyframes} from "styled-components";

export const marquee = keyframes`
    0%{
        transform: translateX(-100%);
    }
    100%{
       transform: translateX(100%);
    }
`
export const TrackInfoContainer = styled.div`
    display:flex;
    flex-direction: column;
    height: 100vh
}`

export const TrackName = styled.div`
    font-size: 3rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 20px;
    h1{
        color: #1DB954;
        display: inline-block;
    }
`
export const TrackAlbum = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position:fixed;
    bottom: 0;
    width: 100%;
    h3{
        display: inline-block;
        animation: ${marquee} 15s linear infinite;
    }
`