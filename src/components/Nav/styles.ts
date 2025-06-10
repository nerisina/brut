import styled from "styled-components";

export const NavContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
margin-top: 20px;
justify-content: space-between;
`

export const UserAvatar = styled.div`
    img{
        width: 50px;
        height: 50px;
        filter: grayscale(100%);
        border: 2px solid #000;
    }
`;