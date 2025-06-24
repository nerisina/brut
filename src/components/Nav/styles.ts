import styled from "styled-components";

export const NavContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: space-between;
    padding: 0 20px;
`

export const UserAvatar = styled.div`
    img{
        width: 50px;
        height: 50px;
        filter: grayscale(100%);
        border: 2px solid #000;
    }
`;