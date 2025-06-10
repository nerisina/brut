import { NavContainer, UserAvatar } from "./styles";
import { redirectToAuthCodeFlow } from "../../auth";

interface NavProps{
    userInfo: string | null; // Expecting a string URL or null
    isLoggedIn: boolean;
}
const Nav = ({ userInfo, isLoggedIn }: NavProps) => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const handleClick = async () => {
        await redirectToAuthCodeFlow(clientId);
    };
    
    const placeholderImgUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemprNGJtcXp6OGd6NDhhZDloZnQ2MmhvbmtqNDRlMDlkamVjaThwMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dHM/rDWXDeR3S0BjnGT9Hc/giphy.gif"; // Placeholder image URL
    return ( 
        <NavContainer>
            <div><h1>Brut</h1></div>
            <div>{!isLoggedIn ? <button onClick={handleClick} title="Login to Spotify">Login</button> : <UserAvatar><img src={userInfo || placeholderImgUrl} alt="User Avatar" className="user-avatar" /></UserAvatar>}</div>
        </NavContainer>
    );
};

export default Nav;